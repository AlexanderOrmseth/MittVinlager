using System.Linq.Expressions;

namespace API.Extensions;

public static class LinqExtensions
{
    /// <summary>
    /// Filters a sequence of based on a predicate of when condition is true.
    /// </summary>
    /// <returns>An IQueryable</returns>
    public static IQueryable<TSource> Where<TSource>(this IQueryable<TSource> source, bool when,
        Expression<Func<TSource, bool>> predicate)
    {
        return when ? source.Where(predicate) : source;
    }
}