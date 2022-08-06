using API.Context;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class WishItemRepository : IWishItemRepository
{
    private readonly MyDbContext _context;

    public WishItemRepository(MyDbContext context)
    {
        _context = context;
    }

    public async Task<ICollection<WishItemDto>> GetAll(int userId, Func<WishItem, WishItemDto> mapEntityToDto,
        CancellationToken cancellationToken)
    {
        return await _context.Wishlist.Where(x => x.UserId == userId).Select(x => mapEntityToDto(x))
            .ToListAsync(cancellationToken);
    }


    public async Task<WishItem?> FindOne(int id, CancellationToken cancellationToken)
    {
        return await _context.Wishlist.FindAsync(new object?[] {id}, cancellationToken: cancellationToken);
    }

    public async Task<int> CountAll(int userId, CancellationToken cancellationToken)
    {
        return await _context.Wishlist.CountAsync(wine => wine.UserId == userId, cancellationToken: cancellationToken);
    }

    public async Task<bool> RemoveThenSave(WishItem wishItem, CancellationToken cancellationToken)
    {
        _context.Wishlist.Remove(wishItem);
        return await Save(cancellationToken);
    }

    public async Task<bool> AddThenSave(WishItem wishItem, CancellationToken cancellationToken)
    {
        _context.Wishlist.Add(wishItem);
        return await Save(cancellationToken);
    }

    public async Task<bool> Save(CancellationToken cancellationToken)
    {
        return await _context.SaveChangesAsync(cancellationToken) > 0;
    }
}