using System.Collections;
using API.DTOs;
using API.Entities;
using API.RequestHelpers;


namespace API.Interfaces;

public interface IWineRepository
{
    IQueryable<WineDto> GetAll(int userId, WineParams wineParams, Func<Wine, WineDto> mapWine);

    Task<int> CountAll(int userId, CancellationToken cancellationToken);

    Task<Wine?> GetOneById(int id, CancellationToken cancellationToken);
    Task<Wine?> FindOne(int id, CancellationToken cancellationToken);

    Task<bool> AddWineThenSave(Wine wine, CancellationToken cancellationToken);

    Task<bool> RemoveThenSave(Wine wine, CancellationToken cancellationToken);

    Task<Wine?> GetWineWithConsumed(int id, CancellationToken cancellationToken);

    Task<Wine?> GetWineWithConsumedAndUserDetails(int id, CancellationToken cancellationToken);

    Task<Wine?> GetWineByConsumedId(int consumedId, CancellationToken cancellationToken);

    Task<object> GetFilters(int userId, CancellationToken cancellationToken);

    Task<ICollection> GetLastConsumed(int userId, CancellationToken cancellationToken);
    Task<ICollection> GetLastPurchases(int userId, CancellationToken cancellationToken);
    Task<ICollection> GetInventoryStatus(int userId, CancellationToken cancellationToken);

    Task<int> GetAllWineCount(CancellationToken cancellationToken);

    Task<bool> AddTestData(IEnumerable<Wine> testData, CancellationToken cancellationToken);

    Task<bool> Save(CancellationToken cancellationToken);
}