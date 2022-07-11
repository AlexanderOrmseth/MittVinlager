using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers;

public class PagedList<T> : List<T>
{
    // number of items on a single page
    private const int PageSize = 2;

    // constructor
    private PagedList(IEnumerable<T> items, int count, int resultCount, int pageNumber)
    {
        MetaData = new MetaData
        {
            ResultCount = resultCount,
            TotalCount = count,
            PageSize = PageSize,
            CurrentPage = pageNumber,
            TotalPages = (int) Math.Ceiling(resultCount / (double) PageSize)
        };

        AddRange(items);
    }

    public MetaData MetaData { get; set; }

    public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int count,
        CancellationToken cancellationToken)
    {
        var resultCount = await query.CountAsync(cancellationToken); // item count

        // skip 0 items on page 1. on page 2 skip 1*pageSize
        var items = await query.Skip(((pageNumber == 0 ? 1 : pageNumber) - 1) * PageSize).Take(PageSize)
            .ToListAsync(cancellationToken);

        return new PagedList<T>(items, count, resultCount, pageNumber);
    }
}