using API.DTOs;
using API.Entities;

namespace API.Extensions;

public static class WineExtension
{
    public static IQueryable<Wine> Sort(this IQueryable<Wine> query, string orderBy)
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

    public static IQueryable<Wine> Search(this IQueryable<Wine> query, string searchTerm)
    {
        // return all if no search term
        if (searchTerm.IsEmpty()) return query;

        var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

        return query.Where(w => w.Name.ToLower().Contains(lowerCaseSearchTerm));
    }

    public static IQueryable<Wine> Filter(this IQueryable<Wine> query, string countries, string types)
    {
        var countryList = new List<string>();
        var typeList = new List<string>();

        // parameter
        if (!string.IsNullOrEmpty(countries))
        {
            countryList.AddRange(countries.ToLower().Split(",").ToList());
        }

        // parameter
        if (!string.IsNullOrEmpty(types))
        {
            typeList.AddRange(types.ToLower().Split(",").ToList());
        }

        // grapes


        // Country
        query = query.Where(w =>
            countryList.Count == 0 || countryList.Contains(w.Country.ToLower()));


        // Type
        query = query.Where(w => typeList.Count == 0 || typeList.Contains(w.Type.ToLower()));

        // TODO: Grapes filtering

        return query;
    }
}