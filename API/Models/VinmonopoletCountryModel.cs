using System.Text.Json.Serialization;

namespace API.Models;

public class VinmonopoletCountryModel
{
    [JsonPropertyName("countryId")] public string CountryId { get; set; }
    [JsonPropertyName("country")] public string Country { get; set; }
}