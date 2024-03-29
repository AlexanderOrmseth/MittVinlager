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


    /// <summary>
    /// Sorts the elements of a sequence in ascending or descending order according to a key. 
    /// </summary>
    /// <typeparam name="TSource">The type of the elements of source.</typeparam>
    /// <typeparam name="TKey">The type of the key returned by the function represented by keySelector.</typeparam>
    /// <param name="source">A sequence of values to order.</param>
    /// <param name="keySelector">A function to extract a key from an element.</param>
    /// <param name="descending">Sort should be in descending or ascending (default) order.</param>
    /// <returns></returns>
    public static IOrderedQueryable<TSource> OrderBy<TSource, TKey>(this IQueryable<TSource> source,
        Expression<Func<TSource, TKey>> keySelector, bool descending)
    {
        return descending
            ? source.OrderByDescending(keySelector)
            : source.OrderBy(keySelector);
    }

    /// <summary>
    /// Performs a subsequent ordering of the elements in a sequence in ascending or descending  order according to a key.
    /// </summary>
    /// <typeparam name="TSource">The type of the elements of source.</typeparam>
    /// <typeparam name="TKey">The type of the key returned by the function represented by keySelector.</typeparam>
    /// <param name="source">An System.Linq.IOrderedQueryable that contains elements to sort.</param>
    /// <param name="when">True if the sort should be executed.</param>
    /// <param name="keySelector">A function to extract a key from each element.</param>
    /// <param name="descending"></param>
    /// <returns>An System.Linq.IOrderedQueryable whose elements are sorted according to a key if when condition is true.</returns>
    public static IOrderedQueryable<TSource> ThenBy<TSource, TKey>(this IOrderedQueryable<TSource> source,
        Expression<Func<TSource, TKey>> keySelector, bool descending)
    {
        return descending ? source.ThenByDescending(keySelector) : source.ThenBy(keySelector);
    }
}