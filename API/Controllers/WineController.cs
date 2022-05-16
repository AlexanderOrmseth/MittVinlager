using System.Security.Claims;
using System.Security.Principal;
using API.Context;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class WineController : BaseApiController
{
    private readonly MyDbContext _context;
    private readonly UserManager<User> _userManager;
    private readonly ImageService _imageService;


    public WineController(MyDbContext context, UserManager<User> userManager, ImageService imageService)
    {
        _context = context;
        _userManager = userManager;
        _imageService = imageService;
    }

    /// <summary>
    /// Get all wine
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<WineDto>>> GetWine([FromQuery] WineParams wineParams)
    {
        var userId = await GetUserId(User);


        var query = _context.Wines
            .Where(wine => wine.UserId == userId)
            .Include(w => w.UserDetailses)
            .Search(wineParams.SearchTerm!)
            .Sort(wineParams.OrderBy!)
            .Filter(wineParams.Countries!, wineParams.Types!)
            .Select(w => MapWineToWineDto(w))
            .AsQueryable();


        // query with filers
        var wines =
            await PagedList<WineDto>.ToPagedList(query, wineParams.PageNumber);

        Response.AddPaginationHeader(wines.MetaData);
        return wines;
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var userId = await GetUserId(User);

        // filter options
        var types = await _context.Wines.Where(w => w.UserId == userId).Select(w => w.Type).Distinct().ToListAsync();

        var countries = await _context.Wines.Where(w => w.UserId == userId && w.Country != null).Select(w => w.Country)
            .Distinct()
            .ToListAsync();

        // return
        return Ok(new {countries, types});
    }

    /// <summary>
    /// Get wine by id
    /// </summary>
    /// <returns>A single wine</returns>
    /// 
    [HttpGet("{id:int}", Name = "GetSingleWine")]
    public async Task<ActionResult<WineDto>> GetSingleWine(int id)
    {
        var wine = await _context.Wines
            .Include(w => w.UserDetailses)
            .FirstOrDefaultAsync(w => w.WineId == id);

        // check if wine exists
        if (wine == null)
        {
            return NotFound(new ProblemDetails {Title = "Denne vinen eksisterer ikke."});
        }

        var userId = await GetUserId(User);

        // check if wine belongs to user
        if (wine.UserId != userId)
        {
            return Forbid();
        }

        // return mapped wine
        return MapWineToWineDto(wine);
    }


    /// <summary>
    /// Add new wine
    /// </summary>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult<WineDto>> AddWine([FromBody] WineFormDto wineFormDto)
    {
        // get user id
        var userId = await GetUserId(User);

        // User can only store 200 wines
        if (await _context.Wines.CountAsync(wine => wine.UserId == userId) > 200)
        {
            return BadRequest();
        }

        var newWine = MapWineFormDtoToWine(wineFormDto, userId);

        // adding image url + image id
        if (wineFormDto.ProductId != null && wineFormDto.ProductId.IsNumeric())
        {
            var imageResult = await _imageService.AddImageAsync(wineFormDto.ProductId, userId);

            if (imageResult.Error != null)
                return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});

            newWine.PictureUrl = imageResult.SecureUrl.ToString();
            newWine.PublicId = imageResult.PublicId;
        }

        // add wine
        _context.Wines.Add(newWine);
        var result = await _context.SaveChangesAsync() > 0;

        // TODO : Should return object from getSingleWine -> currently returns newWine
        // success
        if (result)
        {
            return CreatedAtRoute("GetSingleWine", new {id = newWine.WineId}, newWine);
        }

        // else bad request
        return BadRequest(new ProblemDetails {Title = "Problem adding wine"});
    }


    /// <summary>
    /// Update wine by id
    /// </summary>
    /// <returns></returns>
    [HttpPut("{id:int}")]
    public async Task<ActionResult<WineDto>> UpdateWine([FromBody] WineFormDto wineFormDto, int id)
    {
        var wine = await _context.Wines
            .Include(w => w.UserDetailses)
            .FirstOrDefaultAsync(w => w.WineId == id);

        // check if wine exists and id parameter matches wine
        if (wine is null)
        {
            return NotFound();
        }

        // get user id
        var userId = await GetUserId(User);

        // check if wine belongs to user
        if (wine.UserId != userId)
        {
            return Forbid();
        }

        // productId
        var productId = wine.ProductId;

        // update values
        wine.Name = wineFormDto.Name;
        wine.Type = wineFormDto.Type;
        wine.Year = wineFormDto.Year;
        wine.Price = wineFormDto.Price;
        wine.Volume = wineFormDto.Volume;
        wine.AlcoholContent = wineFormDto.AlcoholContent;
        wine.Country = wineFormDto.Country;
        wine.CountryId = wineFormDto.CountryId;
        wine.Region = wineFormDto.Region;
        wine.SubRegion = wineFormDto.SubRegion;
        wine.ProductId = wineFormDto.ProductId;
        wine.Grapes = wineFormDto.Grapes;
        wine.ManufacturerName = wineFormDto.ManufacturerName;
        wine.StoragePotential = wineFormDto.StoragePotential;
        wine.Colour = wineFormDto.Colour;
        wine.Odour = wineFormDto.Odour;
        wine.Taste = wineFormDto.Taste;
        wine.Freshness = wineFormDto.Freshness;
        wine.Fullness = wineFormDto.Fullness;
        wine.Bitterness = wineFormDto.Bitterness;
        wine.Sweetness = wineFormDto.Sweetness;
        wine.Tannins = wineFormDto.Tannins;
        // update user details
        wine.UserDetailses.Quantity = wineFormDto.UserDetails.Quantity;
        wine.UserDetailses.PurchaseLocation = wineFormDto.UserDetails.PurchaseLocation;
        wine.UserDetailses.PurchaseDate = wineFormDto.UserDetails.PurchaseDate;
        wine.UserDetailses.DrinkingWindowMin = wineFormDto.UserDetails.DrinkingWindowMin;
        wine.UserDetailses.DrinkingWindowMax = wineFormDto.UserDetails.DrinkingWindowMax;
        wine.UserDetailses.UserNote = wineFormDto.UserDetails.UserNote;
        wine.UserDetailses.Favorite = wineFormDto.UserDetails.Favorite;
        wine.UserDetailses.Score = wineFormDto.UserDetails.Score;
        wine.UserDetailses.UserRating = wineFormDto.UserDetails.UserRating;


        // check changes
        var changes = _context.Entry(wine).State == EntityState.Unchanged;

        if (changes)
        {
            return BadRequest(new ProblemDetails {Title = "Du har ikke gjort noen endringer!"});
        }

        // new product Id
        if (wineFormDto.ProductId != null && wineFormDto.ProductId.IsNumeric() &&
            !string.Equals(productId, wineFormDto.ProductId))
        {
            // Already has an image attached
            if (!string.IsNullOrEmpty(wine.PublicId))
            {
                // replace image
                var imageResult = await _imageService.UpdateImageAsync(wineFormDto.ProductId, wine.PublicId);

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});

                wine.PictureUrl = imageResult.SecureUrl.ToString();
                wine.PublicId = imageResult.PublicId;
            }
        }

        var result = await _context.SaveChangesAsync(acceptAllChangesOnSuccess: true) > 0;

        if (result)
        {
            return Ok(wine);
        }

        // else bad request
        return BadRequest(new ProblemDetails {Title = "Problem updating wine"});
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> RemoveWine(int id)
    {
        var wine = await _context.Wines.FindAsync(id);

        // check if wine exists
        if (wine == null)
        {
            return NotFound(new ProblemDetails {Title = "Denne vinen eksisterer ikke."});
        }

        var userId = await GetUserId(User);

        // check if wine belongs to user
        if (wine.UserId != userId)
        {
            return Forbid();
        }

        // if cloudinary has image -> delete
        if (!string.IsNullOrEmpty(wine.PublicId))
        {
            await _imageService.DeleteImageAsync(wine.PublicId);
        }

        _context.Wines.Remove(wine);

        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            return Ok($"Slettet {wine.Name}");
        }

        return BadRequest("kunne ikke slette denne vinen.");
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

    private static WineDto MapWineToWineDto(Wine wine)
    {
        return new WineDto
        {
            WineId = wine.WineId,
            Name = wine.Name,
            Type = wine.Type,
            Year = wine.Year,
            Price = wine.Price,
            PictureUrl = wine.PictureUrl,
            PublicId = wine.ProductId,
            Volume = wine.Volume,
            AlcoholContent = wine.AlcoholContent,
            Country = wine.Country,
            CountryId = wine.CountryId,
            Region = wine.Region,
            SubRegion = wine.SubRegion,
            ProductId = wine.ProductId,
            Grapes = wine.Grapes,
            ManufacturerName = wine.ManufacturerName,
            StoragePotential = wine.StoragePotential,
            Colour = wine.Colour,
            Odour = wine.Odour,
            Taste = wine.Taste,
            Freshness = wine.Freshness,
            Fullness = wine.Fullness,
            Bitterness = wine.Bitterness,
            Sweetness = wine.Sweetness,
            Tannins = wine.Tannins,
            CreatedAt = wine.CreatedAt,
            UpdatedAt = wine.UpdatedAt,
            UserDetails = new WineUserDetailsDto
            {
                Quantity = wine.UserDetailses.Quantity,
                PurchaseLocation = wine.UserDetailses.PurchaseLocation,
                PurchaseDate = wine.UserDetailses.PurchaseDate,
                DrinkingWindowMin = wine.UserDetailses.DrinkingWindowMin,
                DrinkingWindowMax = wine.UserDetailses.DrinkingWindowMax,
                UserNote = wine.UserDetailses.UserNote,
                Favorite = wine.UserDetailses.Favorite,
                Score = wine.UserDetailses.Score,
                UserRating = wine.UserDetailses.UserRating,
            }
        };
    }

    private static Wine MapWineFormDtoToWine(WineFormDto wineFormDto, int userId)
    {
        return new Wine(userId)
        {
            Name = wineFormDto.Name,
            Type = wineFormDto.Type,
            Year = wineFormDto.Year,
            Price = wineFormDto.Price,
            Volume = wineFormDto.Volume,
            AlcoholContent = wineFormDto.AlcoholContent,
            Country = wineFormDto.Country,
            CountryId = wineFormDto.CountryId,
            Region = wineFormDto.Region,
            SubRegion = wineFormDto.SubRegion,
            ProductId = wineFormDto.ProductId,
            Grapes = wineFormDto.Grapes,
            ManufacturerName = wineFormDto.ManufacturerName,
            StoragePotential = wineFormDto.StoragePotential,
            Colour = wineFormDto.Colour,
            Odour = wineFormDto.Odour,
            Taste = wineFormDto.Taste,
            Freshness = wineFormDto.Freshness,
            Fullness = wineFormDto.Fullness,
            Bitterness = wineFormDto.Bitterness,
            Sweetness = wineFormDto.Sweetness,
            Tannins = wineFormDto.Tannins,
            UserDetailses = new WineUserDetails
            {
                Quantity = wineFormDto.UserDetails.Quantity,
                PurchaseLocation = wineFormDto.UserDetails.PurchaseLocation,
                PurchaseDate = wineFormDto.UserDetails.PurchaseDate,
                DrinkingWindowMin = wineFormDto.UserDetails.DrinkingWindowMin,
                DrinkingWindowMax = wineFormDto.UserDetails.DrinkingWindowMax,
                UserNote = wineFormDto.UserDetails.UserNote,
                Favorite = wineFormDto.UserDetails.Favorite,
                Score = wineFormDto.UserDetails.Score,
                UserRating = wineFormDto.UserDetails.UserRating,
            }
        };
    }
}