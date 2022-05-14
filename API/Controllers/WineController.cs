using System.Security.Principal;
using API.Context;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class WineController : BaseApiController
{
    private readonly MyDbContext _context;
    private readonly UserManager<User> _userManager;


    public WineController(MyDbContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    /// <summary>
    /// Get all wine
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<WineDto>>> GetWine([FromQuery] WineParams wineParams)
    {
        var userId = await GetUserId(User);

        var query = _context.Wines
            .Where(wine => wine.UserId == userId)
            .Include(w => w.UserDetailses)
            .Search(wineParams.SearchTerm!)
            .Sort(wineParams.OrderBy!)
            .Filter(wineParams.Countries!, wineParams.Types!)
            .Select(w => MapWineToWineDto(w))
            .AsQueryable();


        // query with filers
        var wines =
            await PagedList<WineDto>.ToPagedList(query, wineParams.PageNumber);
        Response.AddPaginationHeader(wines.MetaData);

        return wines;
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var userId = await GetUserId(User);

        // filter options
        var types = await _context.Wines.Where(w => w.UserId == userId).Select(w => w.Type).Distinct().ToListAsync();
        var countries = await _context.Wines.Where(w => w.UserId == userId && w.Country != null).Select(w => w.Country)
            .Distinct()
            .ToListAsync();

        // return
        return Ok(new {countries, types});
    }

    /// <summary>
    /// Get wine by id
    /// </summary>
    /// <returns>A single wine</returns>
    /// 
    [HttpGet("{id:int}", Name = "GetSingleWine")]
    public async Task<ActionResult<WineDto>> GetSingleWine(int id)
    {
        var wine = await _context.Wines
            .Include(w => w.UserDetailses)
            .FirstOrDefaultAsync(w => w.WineId == id);

        // check if wine exists
        if (wine == null)
        {
            return NotFound(new ProblemDetails {Title = "Denne vinen eksisterer ikke."});
        }

        var userId = await GetUserId(User);

        // check if wine belongs to user
        if (wine.UserId != userId)
        {
            return Forbid();
        }

        // return mapped wine
        return MapWineToWineDto(wine);
    }


    /// <summary>
    /// Add new wine
    /// </summary>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult<WineDto>> AddWine([FromBody] WineFormDto wineFormDto)
    {
        // get user id
        var userId = await GetUserId(User);

        if (!ModelState.IsValid)
        {
        }

        // User can only store 200 wines
        if (await _context.Wines.CountAsync(wine => wine.UserId == userId) > 200)
        {
            return BadRequest();
        }

        var newWine = MapWineFormDtoToWine(wineFormDto, userId);

        // add wine
        _context.Wines.Add(newWine);
        var result = await _context.SaveChangesAsync() > 0;

        // TODO : Should return object from getSingleWine -> currently returns newWine
        // success
        if (result)
        {
            return CreatedAtRoute("GetSingleWine", new {id = newWine.WineId}, newWine);
        }

        // else bad request
        return BadRequest(new ProblemDetails {Title = "Problem adding wine"});
    }


    /// <summary>
    /// Update wine by id
    /// </summary>
    /// <returns></returns>
    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateWine([FromBody] WineFormDto wineFormDto, int id)
    {
        var wine = await _context.Wines.FindAsync(id);

        if (wine == null)
        {
            return NotFound();
        }

        // get user id
        var userId = await GetUserId(User);


        // check if wine belongs to user
        if (wine.UserId != userId)
        {
            return Forbid();
        }

        // update values
        wine.Name = wineFormDto.Name;
        wine.Type = wineFormDto.Type;
        wine.Year = wineFormDto.Year;
        wine.Volume = wineFormDto.Volume;
        wine.Price = wineFormDto.Price;
        wine.AlcoholContent = wineFormDto.AlcoholContent;
        wine.Country = wineFormDto.Country;
        wine.Region = wineFormDto.Region;
        wine.SubRegion = wineFormDto.SubRegion;
        wine.ManufacturerName = wineFormDto.ManufacturerName;
        wine.Grapes = wineFormDto.Grapes;


        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            return Ok(MapWineToWineDto(wine));
        }

        // else bad request
        return BadRequest(new ProblemDetails {Title = "Problem adding wine"});
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> RemoveWine(int id)
    {
        var wine = await _context.Wines.FindAsync(id);

        // check if wine exists
        if (wine == null)
        {
            return NotFound(new ProblemDetails {Title = "Denne vinen eksisterer ikke."});
        }

        var userId = await GetUserId(User);

        // check if wine belongs to user
        if (wine.UserId != userId)
        {
            return Forbid();
        }

        _context.Wines.Remove(wine);
        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            return Ok($"Slettet {wine.Name}");
        }

        return BadRequest("kunne ikke slette denne vinen.");
    }


    private async Task<int> GetUserId(IPrincipal user)
    {
        return (await _userManager.FindByNameAsync(user.Identity?.Name)).Id;
    }

    private static WineDto MapWineToWineDto(Wine wine)

    {
        return new WineDto
        {
            WineId = wine.WineId,
            Name = wine.Name,
            Type = wine.Type,
            Year = wine.Year,
            Price = wine.Price,
            Volume = wine.Volume,
            AlcoholContent = wine.AlcoholContent,
            Country = wine.Country,
            Region = wine.Region,
            SubRegion = wine.SubRegion,
            ProductId = wine.ProductId,
            Grapes = wine.Grapes,
            ManufacturerName = wine.ManufacturerName,
            StoragePotential = wine.StoragePotential,
            Colour = wine.Colour,
            Odour = wine.Odour,
            Taste = wine.Taste,
            Freshness = wine.Freshness,
            Fullness = wine.Fullness,
            Bitterness = wine.Bitterness,
            Sweetness = wine.Sweetness,
            Tannins = wine.Tannins,
            CreatedAt = wine.CreatedAt,
            UpdatedAt = wine.UpdatedAt,
            UserDetails = new WineUserDetailsDto
            {
                Quantity = wine.UserDetailses.Quantity,
                PurchaseLocation = wine.UserDetailses.PurchaseLocation,
                PurchaseDate = wine.UserDetailses.PurchaseDate,
                DrinkingWindowMin = wine.UserDetailses.DrinkingWindowMin,
                DrinkingWindowMax = wine.UserDetailses.DrinkingWindowMax,
                UserNote = wine.UserDetailses.UserNote,
                Favorite = wine.UserDetailses.Favorite,
                Score = wine.UserDetailses.Score,
                UserRating = wine.UserDetailses.UserRating,
            }
        };
    }

    private static Wine MapWineFormDtoToWine(WineFormDto wineFormDto, int userId)
    {
        return new Wine(userId)
        {
            Name = wineFormDto.Name,
            Type = wineFormDto.Type,
            Year = wineFormDto.Year,
            Price = wineFormDto.Price,
            Volume = wineFormDto.Volume,
            AlcoholContent = wineFormDto.AlcoholContent,
            Country = wineFormDto.Country,
            Region = wineFormDto.Region,
            SubRegion = wineFormDto.SubRegion,
            ProductId = wineFormDto.ProductId,
            Grapes = wineFormDto.Grapes,
            ManufacturerName = wineFormDto.ManufacturerName,
            StoragePotential = wineFormDto.StoragePotential,
            Colour = wineFormDto.Colour,
            Odour = wineFormDto.Odour,
            Taste = wineFormDto.Taste,
            Freshness = wineFormDto.Freshness,
            Fullness = wineFormDto.Fullness,
            Bitterness = wineFormDto.Bitterness,
            Sweetness = wineFormDto.Sweetness,
            Tannins = wineFormDto.Tannins,
            UserDetailses = new WineUserDetails
            {
                Quantity = wineFormDto.UserDetails.Quantity,
                PurchaseLocation = wineFormDto.UserDetails.PurchaseLocation,
                PurchaseDate = wineFormDto.UserDetails.PurchaseDate,
                DrinkingWindowMin = wineFormDto.UserDetails.DrinkingWindowMin,
                DrinkingWindowMax = wineFormDto.UserDetails.DrinkingWindowMax,
                UserNote = wineFormDto.UserDetails.UserNote,
                Favorite = wineFormDto.UserDetails.Favorite,
                Score = wineFormDto.UserDetails.Score,
                UserRating = wineFormDto.UserDetails.UserRating,
            }
        };
    }
}