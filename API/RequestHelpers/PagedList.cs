using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers;

public class PagedList<T> : List<T>
{
    // number of items on a single page
    private const int PageSize = 20;

    // constructor
    private PagedList(IEnumerable<T> items, int count, int pageNumber)
    {
        MetaData = new MetaData
        {
            TotalCount = count,
            PageSize = PageSize,
            CurrentPage = pageNumber,
            TotalPages = (int) Math.Ceiling(count / (double) PageSize)
        };

        AddRange(items);
    }

    public MetaData MetaData { get; set; }

    public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber)
    {
        var count = await query.CountAsync(); // item count

        // skip 0 items on page 1. on page 2 skip 1*pageSize
        var items = await query.Skip(((pageNumber == 0 ? 1 : pageNumber) - 1) * PageSize).Take(PageSize).ToListAsync();

        return new PagedList<T>(items, count, pageNumber);
    }
}