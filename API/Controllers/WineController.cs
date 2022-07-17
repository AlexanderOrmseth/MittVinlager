using System.Security.Claims;
using System.Security.Principal;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.RequestHelpers;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class WineController : BaseApiController
{
    #region Fields

    private readonly ImageService _imageService;
    private readonly IWineRepository _wineRepository;

    #endregion

    #region Constructor

    public WineController(ImageService imageService,
        IWineRepository wineRepository)
    {
        _imageService = imageService;
        _wineRepository = wineRepository;
    }

    #endregion


    /// <summary>
    /// Gets all wine that belongs to user
    /// </summary>
    /// <returns>20 wine - based on pageSize</returns>
    [HttpGet]
    public async Task<ActionResult<PagedList<WineDto>>> AllWine([FromQuery] WineParams wineParams,
        CancellationToken cancellationToken)
    {
        var userId = GetUserId(User);
        var count = await _wineRepository.CountAll(userId, cancellationToken);
        var query = _wineRepository.GetAll(userId, wineParams, MapWineToDto);

        // query with filers
        var wines =
            await PagedList<WineDto>.ToPagedList(query, wineParams.PageNumber, count, cancellationToken);
        Response.AddPaginationHeader(wines.MetaData);
        return wines;
    }

    /// <summary>
    /// Get filters that client uses for filter options
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns>Lists of filter options</returns>
    [HttpGet("filters")]
    public async Task<ActionResult<object>> GetFilters(CancellationToken cancellationToken)
    {
        var userId = GetUserId(User);
        return Ok(await _wineRepository.GetFilters(userId, cancellationToken));
    }

    /// <summary>
    /// Gets 3 lists: value, last purchases and last consumed
    /// </summary>
    [HttpGet("statistics")]
    public async Task<ActionResult<object>> GetStatistics(CancellationToken cancellationToken)
    {
        var userId = GetUserId(User);
        var inventoryStatus = await _wineRepository.GetInventoryStatus(userId, cancellationToken);
        var lastPurchased = await _wineRepository.GetLastPurchases(userId, cancellationToken);
        var lastConsumed = await _wineRepository.GetLastConsumed(userId, cancellationToken);
        return Ok(new {inventoryStatus, lastPurchased, lastConsumed});
    }

    /// <summary>
    /// Get wine by id
    /// </summary>
    /// <returns>A single wine</returns>
    [HttpGet("{id:int}", Name = "GetSingleWine")]
    public async Task<ActionResult<WineDto>> GetSingleWine(int id, CancellationToken cancellationToken)
    {
        var wine = await _wineRepository.GetOneById(id, cancellationToken);

        // check if wine exists
        if (wine is null)
        {
            return NotFound(new ProblemDetails {Title = "Denne vinen eksisterer ikke."});
        }

        var userId = GetUserId(User);

        // check if wine belongs to user
        if (wine.UserId != userId)
        {
            return Forbid();
        }

        // return mapped wine
        return MapWineToDto(wine);
    }

    /// <summary>
    /// Add new wine
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<WineDto>> AddWine([FromForm] AddWineDto formBody,
        CancellationToken cancellationToken)
    {
        // get user id
        var userId = GetUserId(User);

        // User can only store 200 wines
        if (await _wineRepository.CountAll(userId, cancellationToken) > 200)
        {
            return BadRequest();
        }

        var newWine = MapDtoToWine(formBody, userId);

        // Add image from file
        if (formBody.File is not null)
        {
            var imageResult = await _imageService.AddImageFromFileAsync(formBody.File, userId);

            if (imageResult.Error is not null)
            {
                return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});
            }

            newWine.AddPicture(imageResult, true);
        }
        //  Add image from valid product id
        else if (formBody.ProductId.IsNumeric())
        {
            var imageResult = await _imageService.AddImageAsync(formBody.ProductId, userId);

            if (imageResult.Error is not null)
            {
                return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});
            }

            newWine.AddPicture(imageResult);
        }


        // Add wine and save
        var result = await _wineRepository.AddWineThenSave(newWine, cancellationToken);

        // success
        if (result)
        {
            return CreatedAtAction(nameof(GetSingleWine), new {id = newWine.WineId}, newWine);
        }

        // else bad request
        return BadRequest(new ProblemDetails {Title = "Problem adding wine"});
    }

    /// <summary>
    /// Update wine by id
    /// </summary>
    [HttpPut("{id:int}")]
    public async Task<ActionResult<WineDto>> UpdateWine([FromForm] AddWineDto formBody, int id,
        CancellationToken cancellationToken)
    {
        var wine = await _wineRepository.GetOneById(id, cancellationToken);

        // check if wine exists and id parameter matches wine
        if (wine is null)
        {
            return NotFound();
        }

        // get user id
        var userId = GetUserId(User);

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

        // add/update image from file
        if (formBody.File is not null)
        {
            var imageResult = !string.IsNullOrEmpty(wine.PublicId)
                ? await _imageService.UpdateImageFromFileAsync(formBody.File, wine.PublicId)
                : await _imageService.AddImageFromFileAsync(formBody.File, userId);

            if (imageResult.Error is not null)
                return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});

            wine.AddPicture(imageResult, true);
        }
        // Not a file and has a valid product Id
        else if (formBody.ProductId.IsNumeric())
        {
            // already has image
            if (wine.PublicId.IsNotEmpty())
            {
                // Replace image if productId is different, or if user wants to replace image
                var replaceImage =
                    !string.Equals(productId, formBody.ProductId) && !wine.ImageByUser
                    || formBody.ResetImage;

                if (replaceImage)
                {
                    var imageResult = await _imageService.UpdateImageAsync(formBody.ProductId, wine.PublicId);

                    if (imageResult.Error is not null)
                    {
                        return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});
                    }

                    wine.AddPicture(imageResult);
                }
            }
            // Has no image
            else
            {
                var imageResult = await _imageService.AddImageAsync(formBody.ProductId, userId);

                if (imageResult.Error is not null)
                {
                    return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});
                }

                wine.AddPicture(imageResult);
            }
        }


        var result = await _wineRepository.Save(cancellationToken);

        if (result)
        {
            return Ok(wine);
        }

        // else bad request
        return BadRequest(new ProblemDetails {Title = "Problem updating wine"});
    }

    /// <summary>
    /// Gets consumed dates of wine with given Id
    /// </summary>
    /// <param name="wineId"></param>
    /// <param name="cancellationToken"></param>
    /// <returns>10 dates</returns>
    [HttpGet("consumed/{wineId:int}")]
    public async Task<ActionResult<object>> GetConsumedById(int wineId, CancellationToken cancellationToken)
    {
        // get wine
        var wine = await _wineRepository.GetWineWithConsumed(wineId, cancellationToken);

        // check if wine exists
        if (wine is null)
        {
            return NotFound(new ProblemDetails {Title = "Denne vinen eksisterer ikke."});
        }

        var userId = GetUserId(User);

        // check if wine belongs to user
        if (wine.UserId != userId)
        {
            return Forbid();
        }

        // list of Id and Dates
        var dates = wine.Consumed.Select(w => new {w.Date, w.Id}).OrderByDescending(w => w.Date).ToList();

        return Ok(dates);
    }

    /// <summary>
    /// Deletes consumed date by consumedId
    /// </summary>
    /// <param name="consumedId"></param>
    /// <param name="cancellationToken"></param>
    [HttpDelete("consumed/{consumedId:int}")]
    public async Task<IActionResult> DeleteConsumed(int consumedId, CancellationToken cancellationToken)
    {
        // get wine
        var wine = await _wineRepository.GetWineByConsumedId(consumedId, cancellationToken);

        // check if wine exists
        var userId = GetUserId(User);
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
        var result = await _wineRepository.Save(cancellationToken);

        // success
        if (result)
        {
            return Ok();
        }

        // else bad request
        return BadRequest(new ProblemDetails {Title = "Error, kunne ikke slette drukket-datoen til vinen."});
    }

    /// <summary>
    /// Adds consumed date to a wine. A wine can have 10 consumed dates.
    /// Consumed dates will overwrite the oldest date if list length is 10.
    /// </summary>
    /// <param name="date"></param>
    /// <param name="wineId"></param>
    /// <param name="cancellationToken"></param>
    [HttpPost("consumed/{wineId:int}")]
    public async Task<IActionResult> Consumed([FromBody] DateTime date, [FromRoute] int wineId,
        CancellationToken cancellationToken)
    {
        // get wine
        var wine = await _wineRepository.GetWineWithConsumedAndUserDetails(wineId, cancellationToken);

        // check if wine exists
        if (wine is null)
        {
            return NotFound(new ProblemDetails {Title = "Denne vinen eksisterer ikke."});
        }

        var userId = GetUserId(User);


        // check if wine belongs to user
        if (wine.UserId != userId)
        {
            return Forbid();
        }

        if (wine.UserDetails.Quantity > 0)
        {
            // remove 1 from quantity
            wine.UserDetails.DecrementQuantity();
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

        var result = await _wineRepository.Save(cancellationToken);

        // success
        if (result)
        {
            return Ok();
        }

        // else bad request
        return BadRequest(new ProblemDetails {Title = "Error, kunne ikke legge til drukket-dato til vinen."});
    }

    /// <summary>
    /// Deletes wine by Id.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="cancellationToken"></param>
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteWine(int id, CancellationToken cancellationToken)
    {
        var wine = await _wineRepository.FindOne(id, cancellationToken);

        // check if wine exists
        if (wine is null)
        {
            return NotFound(new ProblemDetails {Title = "Denne vinen eksisterer ikke."});
        }

        var userId = GetUserId(User);


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

        var result = await _wineRepository.RemoveThenSave(wine, cancellationToken);

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
    private static int GetUserId(ClaimsPrincipal user)
    {
        //return (await _userManager.FindByNameAsync(user.Identity?.Name)).Id;
        return int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier));
    }


    private static WineDto MapWineToDto(Wine wine)
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

    private static Wine MapDtoToWine(WineBaseModel formBody, int userId)
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