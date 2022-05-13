using API.DTOs;
using API.Extensions;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

//[Authorize]
public class VinmonopoletController : BaseApiController
{
    private readonly IHttpClientFactory _clientFactory;
    private readonly IConfiguration _config;

    public VinmonopoletController(IHttpClientFactory clientFactory, IConfiguration config)
    {
        _clientFactory = clientFactory;
        _config = config;
    }

    /// <summary>
    /// Fetch a wine from Vinmonopolet API
    /// Note: Vinmonopolet sends the response as a list even though we specify we want a single product!
    /// </summary>
    /// <param name="productId"></param>
    /// <returns></returns>
    [HttpGet("{productId}")]
    public async Task<ActionResult<WineFormDto>> GetWineByProductNumber(string productId)
    {
        // check if parameter is an URL -> substring find ID
        if (!productId.IsNumeric())
        {
            return BadRequest(new ProblemDetails {Title = "Dette produktnummeret er ikke gyldig!"});
        }

        var client = _clientFactory.CreateClient();
        try
        {
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", _config["VinmonopoletSettings:APIKey"]);
            var response = await client
                .GetFromJsonAsync<List<VinmonopoletResponseModel>>(
                    _config["VinmonopoletSettings:BaseURL"] + productId);

            // response successful
            if (response.IsNotNull() && response!.Any())
            {
                return MapVinmonopoletResponseToDto(response!.First());
            }

            return NotFound(new ProblemDetails {Title = "Fant ikke vinen på Vinmonopolet"});
        }
        catch (Exception ex)
        {
            return BadRequest(new ProblemDetails
                {Title = "Could not fetch wine from Vinmonopolet", Detail = ex.Message});
        }
    }

    /*https://apis.vinmonopolet.no/press-products/v1/regions*/
    [HttpGet("countries")]
    public async Task<ActionResult<List<VinmonopoletCountryModel>>> GetCountries()
    {
        var client = _clientFactory.CreateClient();
        try
        {
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", _config["VinmonopoletSettings:APIKey"]);
            var response = await client
                .GetFromJsonAsync<List<VinmonopoletCountryModel>>(
                    "https://apis.vinmonopolet.no/press-products/v1/regions");

            // response successful
            if (response.IsNotNull() && response!.Any())
            {
                return Ok(response);
            }

            return BadRequest();
        }
        catch (Exception ex)
        {
            return BadRequest(new ProblemDetails
                {Title = "Could not fetch countries from Vinmonopolet", Detail = ex.Message});
        }
    }

    private static WineFormDto MapVinmonopoletResponseToDto(VinmonopoletResponseModel response)
    {
        return new WineFormDto
        {
            Name = response.Basic.ProductLongName.IsNotEmpty()
                ? response.Basic.ProductLongName
                : response.Basic.ProductShortName,
            ProductId = response.Basic.ProductId,
            Type = GetWineType(response.Classification),
            Year = response.Basic.Vintage, // TODO: convert 0 -> null
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
    private static string? MapGrapesToString(IReadOnlyCollection<Grape> grapes)
    {
        if (!grapes.Any())
        {
            return null;
        }

        // % grape name || grape name
        var mappedGrapes = grapes
            .Where(grape => !string.IsNullOrEmpty(grape.GrapeDesc))
            .Select(grape => $"{(grape.GrapePct > 0 ? $"{grape.GrapePct}% " : "")}{grape.GrapeDesc}")
            .ToList();

        // return as a string and separate with ", "
        return string.Join<string>(", ", mappedGrapes);
    }
}