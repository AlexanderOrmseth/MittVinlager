using System.Security.Claims;
using System.Security.Principal;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class WishlistController : BaseApiController
{
    private readonly UserManager<User> _userManager;
    private readonly ImageService _imageService;
    private readonly IWishItemRepository _wishItemRepository;

    public WishlistController(UserManager<User> userManager, ImageService imageService,
        IWishItemRepository wishItemRepository)
    {
        _userManager = userManager;
        _imageService = imageService;
        _wishItemRepository = wishItemRepository;
    }

    /// <summary>
    /// Helper function to get userId
    /// </summary>
    /// <param name="user"></param>
    /// <returns>UserId (int)</returns>
    private static int GetUserId(ClaimsPrincipal user)
    {
        //return (await _userManager.FindByNameAsync(user.Identity?.Name)).Id;
        return int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier));
    }

    /// <summary>
    /// Gets user's wishlist
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns>List of wishItemDto</returns>
    [HttpGet]
    public async Task<ActionResult<ICollection<WishItemDto>>> GetWishlist(CancellationToken cancellationToken)
    {
        var userId = GetUserId(User);
        var wishlist = await _wishItemRepository.GetAll(userId, MapEntityToDto, cancellationToken);
        return Ok(wishlist);
    }

    /// <summary>
    /// Deletes wishItem by Id
    /// </summary>
    /// <param name="id">wishItemId</param>
    /// <param name="cancellationToken"></param>
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteWishItem(int id, CancellationToken cancellationToken)
    {
        var wishItem = await _wishItemRepository.FindOne(id, cancellationToken);
        var userId = GetUserId(User);

        // check if wine exists
        if (wishItem is null || wishItem.UserId != userId)
        {
            return NotFound(new ProblemDetails {Title = "Denne eksisterer ikke, eller er allerede slettet."});
        }

        // Delete image if image exists
        if (!string.IsNullOrEmpty(wishItem.PublicId))
        {
            await _imageService.DeleteImageAsync(wishItem.PublicId);
        }

        // remove & save
        var result = await _wishItemRepository.RemoveThenSave(wishItem, cancellationToken);

        if (result)
        {
            return Ok($"Slettet {wishItem.Name}");
        }

        return BadRequest("kunne ikke slette denne vinen.");
    }

    /// <summary>
    /// Adds wishItem
    /// </summary>
    /// <param name="wishItemDto"></param>
    /// <param name="cancellationToken"></param>
    [HttpPost]
    public async Task<ActionResult> AddWishItem(AddWishItemDto wishItemDto, CancellationToken cancellationToken)
    {
        var userId = GetUserId(User);
        var count = await _wishItemRepository.CountAll(userId, cancellationToken);

        // User can only have 10 items in their wishlist
        if (count >= 10)
        {
            return BadRequest(new ProblemDetails {Title = "Du kan max ha 10 vin i ønskelisten din."});
        }

        var newWishItem = MapDtoToEntity(wishItemDto, userId);

        // Add image from product Id
        if (wishItemDto.ProductId.IsNumeric())
        {
            var imageResult = await _imageService.AddImageAsync(wishItemDto.ProductId, userId, true);

            if (imageResult.Error is not null)
            {
                return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});
            }

            newWishItem.AddPicture(imageResult);
        }

        // add item and save
        var result = await _wishItemRepository.AddThenSave(newWishItem, cancellationToken);

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
            AlcoholContent = wishItem.AlcoholContent,
            PictureUrl = wishItem.PictureUrl
        };
    }
}