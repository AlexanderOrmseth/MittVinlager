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
    public async Task<ActionResult<IEnumerable<WineDto>>> GetWine([FromQuery] WineParams wineParams,
        CancellationToken cancellationToken)
    {
        var userId = await GetUserId(User);

        var count = await _context.Wines
            .Where(wine => wine.UserId == userId).CountAsync(cancellationToken);

        var query = _context.Wines
            .Where(wine => wine.UserId == userId)

            // Search
            .Where(wineParams.SearchTerm.IsNotEmpty(),
                w => w.Name.ToLower().Contains(wineParams.SearchTerm!.Trim().ToLower()))

            // Country
            .Where(wineParams.Countries.IsNotEmpty(),
                w => w.Country != null && wineParams.Countries!.ToLower().Contains(w.Country.ToLower()))

            // Quantity
            //.Where(true, w => w.UserDetailses.Quantity >= 1)

            // Types
            .Where(wineParams.Types.IsNotEmpty(),
                w => wineParams.Types!.ToLower().Contains(w.Type.ToLower()))

            // Sort
            .Sort(wineParams.OrderBy)
            .Include(w => w.UserDetails)
            .Select(w => MapWineToWineDto(w))
            .AsQueryable();


        // query with filers
        var wines =
            await PagedList<WineDto>.ToPagedList(query, wineParams.PageNumber, count, cancellationToken);

        Response.AddPaginationHeader(wines.MetaData);
        return wines;
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters(CancellationToken cancellationToken)
    {
        var userId = await GetUserId(User);

        // filter options
        var types = await _context.Wines.Where(w => w.UserId == userId).Select(w => w.Type)
            .Distinct()
            .ToListAsync(cancellationToken);

        var countries = await _context.Wines.Where(w => w.UserId == userId && w.Country != null)
            .Select(w => w.Country)
            .Distinct()
            .ToListAsync(cancellationToken);

        // return
        return Ok(new {countries, types});
    }

    /// <summary>
    /// Gets quantity and value of each wine type 
    /// </summary>
    [HttpGet("statistics")]
    public async Task<ActionResult> GetWineStatistics(CancellationToken cancellationToken)
    {
        var userId = await GetUserId(User);

        var data = await _context.Wines
            .Where(wine => wine.UserId == userId && wine.UserDetails.Quantity > 0)
            .GroupBy(x => x.Type)
            .Select(x => new
            {
                Type = x.Key, Quantity = x.Sum(wine => wine.UserDetails.Quantity),
                Value = x.Sum(wine => wine.Price * wine.UserDetails.Quantity),
                Unique = x.Count()
            })
            .ToListAsync(cancellationToken);

        var lastPurchased = await _context.Wines
            .Where(wine => wine.UserId == userId && wine.UserDetails.PurchaseDate.HasValue)
            .Select(w => new
            {
                w.Name,
                w.WineId,
                Date = w.UserDetails.PurchaseDate,
                w.PictureUrl
            })
            .OrderByDescending(w => w.Date)
            .Take(10)
            .ToListAsync(cancellationToken);

        var lastConsumed = await _context.Wines.Where(w => w.UserId.Equals(userId))
            .Join(_context.Consumed, wine => wine.WineId, consumed => consumed.WineId,
                (wine, consumed) => new
                {
                    consumed.Date,
                    wine.Name,
                    wine.WineId,
                    consumed.Id,
                    wine.PictureUrl
                })
            .OrderByDescending(c => c.Date)
            .Take(10)
            .ToListAsync(cancellationToken);

        return Ok(new {data, lastPurchased, lastConsumed});
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
            .Include(w => w.UserDetails)
            .FirstOrDefaultAsync(w => w.WineId == id);

        // check if wine exists
        if (wine is null)
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
    public async Task<ActionResult<WineDto>> AddWine([FromForm] AddWineDto formBody)
    {
        // get user id
        var userId = await GetUserId(User);

        // User can only store 200 wines
        if (await _context.Wines.CountAsync(wine => wine.UserId == userId) > 200)
        {
            return BadRequest();
        }

        var newWine = MapFormToWine(formBody, userId);

        // Adding image
        if (formBody.File is not null)
        {
            // add image from file
            var imageResult = await _imageService.AddImageFromFileAsync(formBody.File, userId);

            if (imageResult.Error is not null)
                return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});

            newWine.PictureUrl = imageResult.SecureUrl.ToString();
            newWine.PublicId = imageResult.PublicId;
            newWine.ImageByUser = true;
        }
        else
        {
            // from product Id
            if (formBody.ProductId is not null && formBody.ProductId.IsNumeric())
            {
                var imageResult = await _imageService.AddImageAsync(formBody.ProductId, userId);

                if (imageResult.Error is not null)
                    return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});

                newWine.PictureUrl = imageResult.SecureUrl.ToString();
                newWine.PublicId = imageResult.PublicId;
                newWine.ImageByUser = false;
            }
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
    public async Task<ActionResult<WineDto>> UpdateWine([FromForm] AddWineDto formBody, int id)
    {
        var wine = await _context.Wines
            .Include(w => w.UserDetails)
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
        wine.Name = formBody.Name;
        wine.Type = formBody.Type;
        wine.Year = formBody.Year;
        wine.Price = formBody.Price;
        wine.Volume = formBody.Volume;
        wine.AlcoholContent = formBody.AlcoholContent;
        wine.Country = formBody.Country;
        wine.CountryId = formBody.CountryId;
        wine.Region = formBody.Region;
        wine.SubRegion = formBody.SubRegion;
        wine.ProductId = formBody.ProductId;
        wine.Grapes = formBody.Grapes;
        wine.ManufacturerName = formBody.ManufacturerName;
        wine.StoragePotential = formBody.StoragePotential;
        wine.Colour = formBody.Colour;
        wine.Odour = formBody.Odour;
        wine.Taste = formBody.Taste;
        wine.Freshness = formBody.Freshness;
        wine.Fullness = formBody.Fullness;
        wine.Bitterness = formBody.Bitterness;
        wine.Sweetness = formBody.Sweetness;
        wine.Tannins = formBody.Tannins;
        // update user details
        wine.UserDetails.Quantity = formBody.UserDetails.Quantity;
        wine.UserDetails.PurchaseLocation = formBody.UserDetails.PurchaseLocation;
        wine.UserDetails.PurchaseDate = formBody.UserDetails.PurchaseDate;
        wine.UserDetails.DrinkingWindowMin = formBody.UserDetails.DrinkingWindowMin;
        wine.UserDetails.DrinkingWindowMax = formBody.UserDetails.DrinkingWindowMax;
        wine.UserDetails.UserNote = formBody.UserDetails.UserNote;
        wine.UserDetails.Favorite = formBody.UserDetails.Favorite;
        wine.UserDetails.Score = formBody.UserDetails.Score;
        wine.UserDetails.UserRating = formBody.UserDetails.UserRating;

        // will always have a change
        wine.UpdatedAt = DateTime.UtcNow;

        // new product Id
        // Adding image
        if (formBody.File is not null)
        {
            // add image from file
            if (!string.IsNullOrEmpty(wine.PublicId))
            {
                // replace image
                var imageResult = await _imageService.UpdateImageFromFileAsync(formBody.File, wine.PublicId);

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});

                wine.PictureUrl = imageResult.SecureUrl.ToString();
                wine.PublicId = imageResult.PublicId;
                wine.ImageByUser = true;
            }
            else
            {
                // add new image
                var imageResult = await _imageService.AddImageFromFileAsync(formBody.File, userId);

                if (imageResult.Error is not null)
                    return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});

                wine.PictureUrl = imageResult.SecureUrl.ToString();
                wine.PublicId = imageResult.PublicId;
                wine.ImageByUser = true;
            }
        }
        else // image from product id
        {
            // validate product id
            if (formBody.ProductId != null && formBody.ProductId.IsNumeric())
            {
                // user wants to update image 
                // do stuff

                // already has image
                if (!string.IsNullOrEmpty(wine.PublicId))
                {
                    // If product id is different and image is not an user image
                    // If user wants to reset the image
                    if (!string.Equals(productId, formBody.ProductId) && !wine.ImageByUser || formBody.ResetImage)
                    {
                        // replace image
                        var imageResult = await _imageService.UpdateImageAsync(formBody.ProductId, wine.PublicId);

                        if (imageResult.Error != null)
                            return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});

                        wine.PictureUrl = imageResult.SecureUrl.ToString();
                        wine.PublicId = imageResult.PublicId;
                        wine.ImageByUser = false;
                    }
                }
                // does not have image -> add new
                else
                {
                    // add new image
                    var imageResult = await _imageService.AddImageAsync(formBody.ProductId, userId);

                    if (imageResult.Error is not null)
                        return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});

                    wine.PictureUrl = imageResult.SecureUrl.ToString();
                    wine.PublicId = imageResult.PublicId;
                    wine.ImageByUser = false;
                }
            }
        }


        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            return Ok(wine);
        }

        // else bad request
        return BadRequest(new ProblemDetails {Title = "Problem updating wine"});
    }


    [HttpGet("consumed/{wineId:int}")]
    public async Task<ActionResult<List<DateTime>>> GetConsumedDates(int wineId)
    {
        // get wine
        var wine = await _context.Wines.Include(w => w.Consumed).FirstOrDefaultAsync(w => w.WineId == wineId);

        // check if wine exists
        if (wine is null)
        {
            return NotFound(new ProblemDetails {Title = "Denne vinen eksisterer ikke."});
        }

        var userId = await GetUserId(User);

        // check if wine belongs to user
        if (wine.UserId != userId)
        {
            return Forbid();
        }

        // list of Id and Dates
        var dates = wine.Consumed.Select(w => new {w.Date, w.Id}).OrderByDescending(w => w.Date).ToList();

        return Ok(dates);
    }

    [HttpDelete("consumed/{consumedId:int}")]
    public async Task<ActionResult> DeleteConsumed(int consumedId)
    {
        // get wine
        var wine = await _context.Wines
            .Include(w => w.Consumed)
            .Where(w => w.Consumed.Any(c => c.Id.Equals(consumedId))).FirstOrDefaultAsync();


        // check if wine exists
        var userId = await GetUserId(User);
        if (wine is null || wine.UserId != userId)
        {
            return NotFound(new ProblemDetails {Title = "Denne vinen/datoen eksisterer ikke."});
        }

        var consumed = wine.Consumed.Find(w => w.Id.Equals(consumedId));

        // date does not exist/already deleted
        if (consumed is null)
        {
            return NotFound(new ProblemDetails {Title = "Denne datoen eksisterer ikke."});
        }

        // remove date
        wine.Consumed.Remove(consumed);

        // save changes
        var result = await _context.SaveChangesAsync() > 0;

        // success
        if (result)
        {
            return Ok();
        }

        // else bad request
        return BadRequest(new ProblemDetails {Title = "Error, kunne ikke legge til drukket-dato til vinen."});
    }

    [HttpPost("consumed/{wineId:int}")]
    public async Task<ActionResult> Consumed([FromBody] DateTime date, int wineId)
    {
        Console.WriteLine(date);

        // get wine
        var wine = await _context.Wines.Include(w => w.UserDetails).Include(w => w.Consumed.OrderBy(c => c.Date))
            .FirstOrDefaultAsync(w => w.WineId == wineId);

        // check if wine exists
        if (wine is null)
        {
            return NotFound(new ProblemDetails {Title = "Denne vinen eksisterer ikke."});
        }

        var userId = await GetUserId(User);


        // check if wine belongs to user
        if (wine.UserId != userId)
        {
            return Forbid();
        }

        if (wine.UserDetails.Quantity > 0)
        {
            // remove 1 from quantity
            wine.UserDetails.Quantity--;
        }
        else
        {
            return BadRequest(new ProblemDetails {Title = "Du har ikke denne vinen på lager. Antall er 0."});
        }

        // can max have 10 dates on each wine
        if (wine.Consumed.Count >= 10)
        {
            // replace oldest date
            wine.Consumed.ElementAt(0).Date = date;
        }
        else
        {
            // add new date
            var consumed = new Consumed {Date = date};
            wine.Consumed.Add(consumed);
        }

        var result = await _context.SaveChangesAsync() > 0;

        // success
        if (result)
        {
            return Ok();
        }

        // else bad request
        return BadRequest(new ProblemDetails {Title = "Error, kunne ikke legge til drukket-dato til vinen."});
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> RemoveWine(int id)
    {
        var wine = await _context.Wines.FindAsync(id);

        // check if wine exists
        if (wine is null)
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
            ImageByUser = wine.ImageByUser,
            UserDetails = new WineUserDetailsDto
            {
                Quantity = wine.UserDetails.Quantity,
                PurchaseLocation = wine.UserDetails.PurchaseLocation,
                PurchaseDate = wine.UserDetails.PurchaseDate,
                DrinkingWindowMin = wine.UserDetails.DrinkingWindowMin,
                DrinkingWindowMax = wine.UserDetails.DrinkingWindowMax,
                UserNote = wine.UserDetails.UserNote,
                Favorite = wine.UserDetails.Favorite,
                Score = wine.UserDetails.Score,
                UserRating = wine.UserDetails.UserRating,
            }
        };
    }

    private static Wine MapFormToWine(WineBaseModel formBody, int userId)
    {
        return new Wine(userId)
        {
            Name = formBody.Name,
            Type = formBody.Type,
            Year = formBody.Year,
            Price = formBody.Price,
            Volume = formBody.Volume,
            AlcoholContent = formBody.AlcoholContent,
            Country = formBody.Country,
            CountryId = formBody.CountryId,
            Region = formBody.Region,
            SubRegion = formBody.SubRegion,
            ProductId = formBody.ProductId,
            Grapes = formBody.Grapes,
            ManufacturerName = formBody.ManufacturerName,
            StoragePotential = formBody.StoragePotential,
            Colour = formBody.Colour,
            Odour = formBody.Odour,
            Taste = formBody.Taste,
            Freshness = formBody.Freshness,
            Fullness = formBody.Fullness,
            Bitterness = formBody.Bitterness,
            Sweetness = formBody.Sweetness,
            Tannins = formBody.Tannins,
            UserDetails = new WineUserDetails
            {
                Quantity = formBody.UserDetails.Quantity,
                PurchaseLocation = formBody.UserDetails.PurchaseLocation,
                PurchaseDate = formBody.UserDetails.PurchaseDate,
                DrinkingWindowMin = formBody.UserDetails.DrinkingWindowMin,
                DrinkingWindowMax = formBody.UserDetails.DrinkingWindowMax,
                UserNote = formBody.UserDetails.UserNote,
                Favorite = formBody.UserDetails.Favorite,
                Score = formBody.UserDetails.Score,
                UserRating = formBody.UserDetails.UserRating,
            }
        };
    }
}