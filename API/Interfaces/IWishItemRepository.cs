using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IWishItemRepository
{
    Task<ICollection<WishItemDto>> GetAll(int userId, Func<WishItem, WishItemDto> mapEntityToDto,
        CancellationToken cancellationToken);

    Task<WishItem?> FindOne(int id, CancellationToken cancellationToken);

    Task<int> CountAll(int userId, CancellationToken cancellationToken);

    Task<bool> RemoveThenSave(WishItem wishItem, CancellationToken cancellationToken);

    Task<bool> AddThenSave(WishItem wishItem, CancellationToken cancellationToken);

    Task<bool> Save(CancellationToken cancellationToken);
}