using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class WineExtension
{
    public static IQueryable<Wine> Sort(this IQueryable<Wine> query, string? orderBy)
    {
        if (orderBy.IsEmpty()) return query.OrderBy(w => w.Name);

        query = orderBy switch
        {
            "name" => query.OrderBy(wine => wine.Name, orderBy.EndsWith("Desc")),
            "type" => query.OrderBy(wine => wine.Type, orderBy.EndsWith("Desc")),
            "createdAt" => query.OrderBy(wine => wine.CreatedAt, orderBy.EndsWith("Desc")),
            "price" => query.OrderBy(w => w.Price.HasValue).ThenBy(w => w.Price),
            "priceDesc" => query.OrderByDescending(w => w.Price.HasValue).ThenByDescending(w => w.Price),
            
            "country" => query.OrderBy(wine => wine.Country == null).ThenBy(w => w.Country),
            "countryDesc" => query.OrderByDescending(wine => wine.Country == null).ThenByDescending(w => w.Country),
            
            "score" => query.OrderBy(w => w.UserDetails.Score.HasValue).ThenBy(w => w.UserDetails.Score),
            "scoreDesc" => query.OrderByDescending(w => w.UserDetails.Score.HasValue)
                .ThenByDescending(w => w.UserDetails.Score),
            "purchaseDate" => query.OrderBy(w => w.UserDetails.PurchaseDate.HasValue)
                .ThenBy(w => w.UserDetails.PurchaseDate),
            "purchaseDateDesc" => query.OrderByDescending(w => w.UserDetails.PurchaseDate.HasValue)
                .ThenByDescending(w => w.UserDetails.PurchaseDate),
            "updateAt" => query.OrderBy(w => w.UpdatedAt.HasValue).ThenBy(w => w.UpdatedAt),
            "updateAtDesc" => query.OrderByDescending(w => w.UpdatedAt.HasValue).ThenByDescending(w => w.UpdatedAt),
            _ => query.OrderBy(wine => wine.Name)
        };

        return query;
    }


    public static IQueryable<Wine> RecommendedFood(this IQueryable<Wine> query, string? recommendedFood)
    {
        if (recommendedFood is null || recommendedFood.IsEmpty())
        {
            return query;
        }

        var foodList = recommendedFood.Split(",").ToList();
        return foodList.Aggregate(query, (current, food) => current.Where(w => w.RecommendedFood.Contains(food)));
    }

    public static IQueryable<Wine> Grapes(this IQueryable<Wine> query, string? grape)
    {
        if (grape is null || grape.IsEmpty())
        {
            return query;
        }

        return query.Where(x => x.Grapes != null && x.Grapes.ToLower().Contains(grape.ToLower()));
    }
}