using System.Security.Principal;
using API.Context;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class WishlistController : BaseApiController
{
    private readonly UserManager<User> _userManager;
    private readonly MyDbContext _context;

    public WishlistController(UserManager<User> userManager, MyDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    /// <summary>
    /// Helper function to get userId
    /// </summary>
    /// <param name="user"></param>
    /// <returns>UserId (int)</returns>
    private async Task<int> GetUserId(IPrincipal user)
    {
        return (await _userManager.FindByNameAsync(user.Identity?.Name)).Id;
    }

    [HttpGet]
    public async Task<ActionResult<List<WishItemDto>>> GetWishlist()
    {
        var userId = await GetUserId(User);

        var wishlist = await _context.Wishlist.Where(x => x.UserId == userId).Select(x => MapEntityToDto(x))
            .ToListAsync();

        return Ok(wishlist);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> RemoveWishItem(int id)
    {
        var wishItem = await _context.Wishlist.FindAsync(id);
        var userId = await GetUserId(User);

        // check if wine exists
        if (wishItem is null || wishItem.UserId != userId)
        {
            return NotFound(new ProblemDetails {Title = "Denne eksisterer ikke, eller er allerede slettet."});
        }

        _context.Wishlist.Remove(wishItem);

        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            return Ok($"Slettet {wishItem.Name}");
        }

        return BadRequest("kunne ikke slette denne vinen.");
    }

    [HttpPost]
    public async Task<ActionResult> AddWishItem(AddWishItemDto wishItemDto)
    {
        var userId = await GetUserId(User);

        // User can only have 10 items in their wishlist
        if (await _context.Wishlist.CountAsync(wine => wine.UserId == userId) > 10)
        {
            return BadRequest(new ProblemDetails{ Title = "Du kan max ha 10 vin i ønskelisten din."});
        }

        var newWishItem = MapDtoToEntity(wishItemDto, userId);

        // add wine
        _context.Wishlist.Add(newWishItem);

        var result = await _context.SaveChangesAsync() > 0;

        // success
        if (result)
        {
            return Ok();
        }

        // else bad request
        return BadRequest(new ProblemDetails {Title = "Error! Kunne ikke legge til vinen i ønskelisten."});
    }

    private static WishItem MapDtoToEntity(AddWishItemDto wishItemDto, int userId)
    {
        return new WishItem
        {
            UserId = userId,
            Name = wishItemDto.Name,
            Type = wishItemDto.Type,
            ProductId = wishItemDto.ProductId,
            Country = wishItemDto.Country,
            Price = wishItemDto.Price,
            AlcoholContent = wishItemDto.AlcoholContent
        };
    }

    private static WishItemDto MapEntityToDto(WishItem wishItem)
    {
        return new WishItemDto
        {
            Id = wishItem.Id,
            Name = wishItem.Name,
            Type = wishItem.Type,
            ProductId = wishItem.ProductId,
            Country = wishItem.Country,
            Price = wishItem.Price,
            AlcoholContent = wishItem.AlcoholContent
        };
    }
}