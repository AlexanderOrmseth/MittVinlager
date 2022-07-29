using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class WineExtension
{
    public static IQueryable<Wine> Sort(this IQueryable<Wine> query, string? orderBy)
    {
        // if no params -> sort wine by name
        if (orderBy.IsEmpty()) return query.OrderBy(w => w.Name);


        query = orderBy?[..1] switch
        {
            "p" => query.OrderBy(wine => wine.Price, orderBy.EndsWith("Desc")),
            "t" => query.OrderBy(wine => wine.Type, orderBy.EndsWith("Desc")),
            "c" => query.OrderBy(wine => wine.Country, orderBy.EndsWith("Desc")),
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
}