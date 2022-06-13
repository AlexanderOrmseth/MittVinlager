using API.Entities;

namespace API.Extensions;

public static class WineExtension
{
    public static IQueryable<Wine> Sort(this IQueryable<Wine> query, string? orderBy)
    {
        // if no params -> sort wine by name
        if (orderBy.IsEmpty()) return query.OrderBy(w => w.Name);

        // if params 
        query = orderBy switch
        {
            "price" => query.OrderBy(w => w.Price),
            "priceDesc" => query.OrderByDescending(p => p.Price),
            "country" => query.OrderBy(w => w.Country),
            "countryDesc" => query.OrderByDescending(w => w.Country),
            "type" => query.OrderBy(w => w.Type),
            "typeDesc" => query.OrderByDescending(w => w.Type),
            _ => query.OrderBy(w => w.Name) // if no matches
        };

        return query;
    }
}