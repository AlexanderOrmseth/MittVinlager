using System.Collections;
using API.DTOs;
using API.Entities;
using API.RequestHelpers;


namespace API.Interfaces;

public interface IWineRepository
{
    IQueryable<WineDto> GetAll(int userId, WineParams wineParams, Func<Wine, WineDto> mapWine);

    Task<int> CountAll(int userId, CancellationToken cancellationToken);

    Task<Wine?> GetOneById(int id);
    Task<Wine?> FindOne(int id);

    Task<bool> AddWineThenSave(Wine wine);

    Task<bool> RemoveThenSave(Wine wine);

    Task<Wine?> GetWineWithConsumed(int id);

    Task<Wine?> GetWineWithConsumedAndUserDetails(int id);

    Task<Wine?> GetWineByConsumedId(int consumedId);

    Task<object> GetFilters(int userId, CancellationToken cancellationToken);

    Task<ICollection> GetLastConsumed(int userId, CancellationToken cancellationToken);
    Task<ICollection> GetLastPurchases(int userId, CancellationToken cancellationToken);
    Task<ICollection> GetInventoryStatus(int userId, CancellationToken cancellationToken);

    Task<bool> Save();
}