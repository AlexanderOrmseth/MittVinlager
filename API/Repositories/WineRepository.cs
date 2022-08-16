using System.Collections;
using System.Text.RegularExpressions;
using API.Constants;
using API.Context;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Repositories;

public class WineRepository : IWineRepository
{
    private readonly MyDbContext _context;

    public WineRepository(MyDbContext context)
    {
        _context = context;
    }

    public IQueryable<WineDto> GetAll(int userId, WineParams wineParams, Func<Wine, WineDto> mapWine)
    {
        var searchTerm = wineParams.SearchTerm?.Trim().ToLower();

        var query = _context.Wines
            .Where(wine => wine.UserId == userId)

            // Is Storage
            .Where(wineParams.StorageOption.IsEqual(IsInStorage.No),
                w => w.UserDetails.Quantity == 0)
            .Where(wineParams.StorageOption.IsEqual(IsInStorage.Yes),
                w => w.UserDetails.Quantity > 0)

            // Is Favorite
            .Where(wineParams.FavoriteOption.IsEqual(IsFavorite.Yes),
                w => w.UserDetails.Favorite == true)
            .Where(wineParams.FavoriteOption.IsEqual(IsFavorite.No),
                w => w.UserDetails.Favorite == false)

            // Search
            .Where(searchTerm.IsNotEmpty(),
                w => w.Name.ToLower().Contains(searchTerm!)
                     || (w.Region != null && w.Region.ToLower().Contains(searchTerm!))
                     || (w.SubRegion != null && w.SubRegion.ToLower().Contains(searchTerm!))
                     || (w.ManufacturerName != null && w.ManufacturerName.ToLower().Contains(searchTerm!))
                     || (w.ProductId != null && w.ProductId.ToLower().Contains(searchTerm!))
                     || (w.UserDetails.PurchaseLocation != null &&
                         w.UserDetails.PurchaseLocation.ToLower().Contains(searchTerm!)))

            // Country
            .Where(wineParams.Countries.IsNotEmpty(),
                w => w.Country != null && wineParams.Countries!.ToLower().Contains(w.Country.ToLower()))

            // Types
            .Where(wineParams.Types.IsNotEmpty(),
                w => wineParams.Types!.ToLower().Contains(w.Type.ToLower()))

            // Grapes
            .Grapes(wineParams.Grapes)

            // RecommendedFood
            .RecommendedFood(wineParams.RecommendedFood)

            // Sort
            .Sort(wineParams.OrderBy)
            .Include(w => w.UserDetails)
            .Select(w => mapWine(w))
            .AsQueryable();

        return query;
    }

    public async Task<int> CountAll(int userId, CancellationToken cancellationToken)
    {
        return await _context.Wines
            .Where(wine => wine.UserId == userId).CountAsync(cancellationToken);
    }

    public async Task<Wine?> GetOneById(int id, CancellationToken cancellationToken)
    {
        return await _context.Wines
            .Include(w => w.UserDetails)
            .FirstOrDefaultAsync(w => w.WineId == id, cancellationToken: cancellationToken);
    }

    public async Task<Wine?> FindOne(int id, CancellationToken cancellationToken)
    {
        return await _context.Wines.FindAsync(new object?[] {id}, cancellationToken: cancellationToken);
    }

    public async Task<bool> AddWineThenSave(Wine wine, CancellationToken cancellationToken)
    {
        _context.Wines.Add(wine);
        return await Save(cancellationToken);
    }

    public async Task<Wine?> GetWineWithConsumed(int id, CancellationToken cancellationToken)
    {
        // .Select(w => new {w.UserId, w.WineId, w.Consumed})
        return await _context.Wines.Include(w => w.Consumed)
            .FirstOrDefaultAsync(w => w.WineId == id, cancellationToken: cancellationToken);
    }

    public async Task<Wine?> GetWineWithConsumedAndUserDetails(int id, CancellationToken cancellationToken)
    {
        return await _context.Wines.Include(w => w.UserDetails).Include(w => w.Consumed.OrderBy(c => c.Date))
            .FirstOrDefaultAsync(w => w.WineId == id, cancellationToken: cancellationToken);
    }

    public async Task<Wine?> GetWineByConsumedId(int consumedId, CancellationToken cancellationToken)
    {
        return await _context.Wines
            .Include(w => w.Consumed)
            .Where(w => w.Consumed.Any(c => c.Id.Equals(consumedId)))
            .FirstOrDefaultAsync(cancellationToken: cancellationToken);
    }

    public async Task<object> GetFilters(int userId, CancellationToken cancellationToken)
    {
        // all user wine
        var userWine = await _context.Wines
            .Where(w => w.UserId == userId)
            .Select(w => new {w.Type, w.Country, w.RecommendedFood, w.Grapes})
            .ToListAsync(cancellationToken);

        // types to list
        var types = userWine
            .Select(w => w.Type)
            .Distinct().OrderBy(w => w)
            .ToList();

        // countries to list
        var countries = userWine
            .Where(w => w.Country is not null)
            .Select(w => w.Country)
            .Distinct().OrderBy(w => w)
            .ToList();


        // Grapes
        var grapes = userWine
            .Where(w => w.Grapes is not null && w.Grapes.IsNotEmpty())
            .Select(y => Regex.Replace(y.Grapes ?? string.Empty, @"[\d-]+%", string.Empty).Split(", "))
            .SelectMany(x => x.Select(str => str.Trim())).Distinct().OrderBy(x => x)
            .ToList();


        // recommended food to list
        var recommendedFood = userWine
            .Where(w => w.RecommendedFood is not null && w.RecommendedFood.IsNotEmpty())
            .Select(w => w.RecommendedFood?.Split(", ")).SelectMany(x => x ?? Array.Empty<string>()).Distinct()
            .OrderBy(x => x)
            .ToList();

        return new {types, countries, recommendedFood, grapes};
    }

    public async Task<ICollection> GetLastConsumed(int userId, CancellationToken cancellationToken)
    {
        return await _context.Wines.Where(w => w.UserId.Equals(userId))
            .Join(_context.Consumed, wine => wine.WineId, consumed => consumed.WineId,
                (wine, consumed) => new
                {
                    consumed.Date,
                    wine.Name,
                    wine.WineId,
                    consumed.Id,
                    wine.PictureUrl
                })
            .OrderByDescending(c => c.Date)
            .Take(10)
            .ToListAsync(cancellationToken);
    }

    public async Task<ICollection> GetLastPurchases(int userId, CancellationToken cancellationToken)
    {
        return await _context.Wines
            .Where(wine => wine.UserId == userId && wine.UserDetails.PurchaseDate.HasValue)
            .Select(wine => new
            {
                wine.Name,
                wine.WineId,
                Date = wine.UserDetails.PurchaseDate,
                wine.PictureUrl
            })
            .OrderByDescending(wine => wine.Date)
            .Take(10)
            .ToListAsync(cancellationToken);
    }

    public async Task<ICollection> GetInventoryStatus(int userId, CancellationToken cancellationToken)
    {
        return await _context.Wines
            .Where(wine => wine.UserId == userId && wine.UserDetails.Quantity > 0)
            .GroupBy(x => x.Type)
            .Select(x => new
            {
                Type = x.Key, Quantity = x.Sum(wine => wine.UserDetails.Quantity),
                Value = x.Sum(wine => wine.Price * wine.UserDetails.Quantity),
                Unique = x.Count()
            })
            .ToListAsync(cancellationToken);
    }

    public async Task<int> GetAllWineCount(CancellationToken cancellationToken)
    {
        return await _context.Wines.CountAsync(cancellationToken);
    }

    public async Task<bool> RemoveThenSave(Wine wine, CancellationToken cancellationToken)
    {
        _context.Wines.Remove(wine);
        return await Save(cancellationToken);
    }

    public async Task<bool> Save(CancellationToken cancellationToken)
    {
        return await _context.SaveChangesAsync(cancellationToken) > 0;
    }

    public async Task<bool> AddTestData(IEnumerable<Wine> testData, CancellationToken cancellationToken)
    {
        await _context.AddRangeAsync(testData, cancellationToken);
        return await _context.SaveChangesAsync(cancellationToken) > 0;
    }
}