using API.DTOs;
using API.Extensions;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class VinmonopoletController : BaseApiController
{
    private readonly IHttpClientFactory _clientFactory;


    public VinmonopoletController(IHttpClientFactory httpClientFactory) =>
        _clientFactory = httpClientFactory;

    /// <summary>
    /// Fetch a wine from Vinmonopolet API
    /// Note: Vinmonopolet sends the response as a list even though we specify we want a single product!
    /// </summary>
    /// <param name="productId"></param>
    /// <param name="cancellationToken"></param>
    [HttpGet("{productId}")]
    public async Task<ActionResult<WineBaseModel>> GetWineByProductNumber(string? productId,
        CancellationToken cancellationToken)
    {
        if (!productId.IsNumeric())
        {
            return BadRequest(new ProblemDetails {Title = "Dette produktnummeret er ikke gyldig!"});
        }

        var client = _clientFactory.CreateClient("Vinmonopolet");
        try
        {
            var requestUri = $"v0/details-normal?maxResults=1&productId={productId}";
            var httpResponseMessage = await client.GetAsync(requestUri, cancellationToken: cancellationToken);

            // response was successful
            if (httpResponseMessage.IsSuccessStatusCode)
            {
                var response =
                    await httpResponseMessage.Content.ReadFromJsonAsync<List<VinmonopoletResponseModel>>(
                        cancellationToken: cancellationToken);

                // response successful
                if (response.IsNotNull() && response!.Any())
                {
                    return MapVinmonopoletResponseToDto(response!.First());
                }
            }

            return NotFound(new ProblemDetails {Title = "Fant ikke vinen på Vinmonopolet."});
        }
        catch (Exception ex)
        {
            return BadRequest(new ProblemDetails
                {Title = "Could not fetch wine from Vinmonopolet", Detail = ex.Message});
        }
    }

    /// <summary>
    /// Fetch list of countries from VinmonopoletAPI
    /// Response is cached for 5 minutes
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns>List of countries</returns>
    [ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any)]
    [HttpGet("countries")]
    public async Task<ActionResult<List<VinmonopoletCountryModel>>> GetCountries(CancellationToken cancellationToken)
    {
        var client = _clientFactory.CreateClient("Vinmonopolet");
        try
        {
            var httpResponseMessage = await client.GetAsync("v1/regions", cancellationToken: cancellationToken);

            // response was successful
            if (httpResponseMessage.IsSuccessStatusCode)
            {
                var response =
                    await httpResponseMessage.Content.ReadFromJsonAsync<List<VinmonopoletCountryModel>>(
                        cancellationToken: cancellationToken);

                if (response.IsNotNull() && response!.Any())
                {
                    return Ok(response);
                }
            }

            return BadRequest();
        }
        catch (Exception ex)
        {
            return BadRequest(new ProblemDetails
                {Title = "Could not fetch countries from Vinmonopolet", Detail = ex.Message});
        }
    }

    private static WineBaseModel MapVinmonopoletResponseToDto(VinmonopoletResponseModel response)
    {
        return new VinmonopoletDto
        {
            Name = response.Basic.ProductLongName.IsNotEmpty()
                ? response.Basic.ProductLongName
                : response.Basic.ProductShortName,
            ProductId = response.Basic.ProductId,
            Type = GetWineType(response.Classification),
            Year = response.Basic.Vintage.NotZero(),
            Price = (int) Math.Round(response.Prices.First().SalesPrice),
            Volume = response.Basic.Volume,
            AlcoholContent = (int) Math.Round(response.Basic.AlcoholContent),
            Country = response.Origins.Origin.Country,
            Region = response.Origins.Origin.Region,
            SubRegion = response.Origins.Origin.SubRegion,
            Grapes = MapGrapesToString(response.IngredientsClass.Grapes),
            StoragePotential = response.Properties.StoragePotential,
            ManufacturerName = response.Logistics.ManufacturerName,
            Colour = response.Description.Characteristics.Colour,
            Odour = response.Description.Characteristics.Odour,
            Taste = response.Description.Characteristics.Taste,
            Freshness = TasteToInt(response.Description.Freshness),
            Fullness = TasteToInt(response.Description.Fullness),
            Bitterness = TasteToInt(response.Description.Bitterness),
            Sweetness = TasteToInt(response.Description.Sweetness),
            Tannins = TasteToInt(response.Description.Tannins),
            RecommendedFood = RecommendedFoodToString(response.Description.RecommendedFood),
            UserDetails = new WineUserDetailsDto()
        };
    }

    private static int TasteToInt(string tasteValue)
    {
        if (tasteValue.IsEmpty())
        {
            return 0;
        }

        var x = int.TryParse(tasteValue, out var number) ? number : 0;
        return x;
    }

    private static IEnumerable<string>? RecommendedFoodToString(IEnumerable<RecommendedFood>? food)
    {
        // % grape name || grape name
        return food?.Where(x => !string.IsNullOrEmpty(x.FoodDesc))
            .Select(x => x.FoodDesc)
            .ToList();
    }

    /// <summary>
    /// Vinmonopolet has 3 different wine type keys, where in some cases the value is empty.
    /// </summary>
    /// <param name="classification"></param>
    /// <returns>Wine type</returns>
    private static string GetWineType(Classification classification)
    {
        // prioritized order
        return new List<string>
        {
            classification.SubProductTypeName,
            classification.ProductTypeName,
            classification.MainProductTypeName,
            "Ukjent vintype"
        }.First(s => s.IsNotEmpty());
    }

    /// <summary>
    /// Vinmonopolet has an array of grape-objects.
    /// This function combines all the grapes into a string.
    /// </summary>
    /// <param name="grapes"></param>
    /// <returns>x% grapeName, x% grapeName</returns>
    private static IEnumerable<string>? MapGrapesToString(IReadOnlyCollection<Grape> grapes)
    {
        if (!grapes.Any())
        {
            return null;
        }

        // % grape name || grape name
        return grapes
            .Where(grape => !string.IsNullOrEmpty(grape.GrapeDesc))
            .Select(grape => $"{(grape.GrapePct > 0 ? $"{grape.GrapePct}% " : "")}{grape.GrapeDesc}")
            .ToList();

        // return as a string and separate with ", "
        // return string.Join<string>(", ", mappedGrapes);
    }
}