using System.Linq.Expressions;

namespace API.Extensions;

public static class LinqExtensions
{
    /// <summary>
    /// Filters a sequence of based on a predicate if the condition is true.
    /// </summary>
    /// <returns>An IQueryable</returns>
    public static IQueryable<TSource> Where<TSource>(this IQueryable<TSource> query, bool condition,
        Expression<Func<TSource, bool>> predicate)
    {
        return condition ? query.Where(predicate) : query;
    }
}