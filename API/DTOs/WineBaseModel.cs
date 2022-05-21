using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class WineBaseModel
{
    [Required(ErrorMessage = "Navn på vin er påkrevd.")]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "Type er påkrevd.")]
    public string Type { get; set; } = null!;

    public int? Year { get; set; }
    public int? Price { get; set; }
    public double? Volume { get; set; }
    public int? AlcoholContent { get; set; }
    public string? Country { get; set; }
    public string? CountryId { get; set; }
    public string? Region { get; set; }
    public string? SubRegion { get; set; }
    public string? ProductId { get; set; }
    public string? Grapes { get; set; }

    public string? ManufacturerName { get; set; }
    public string? StoragePotential { get; set; }

    // taste
    public string? Colour { get; set; }
    public string? Odour { get; set; }
    public string? Taste { get; set; }

    public int Freshness { get; set; }
    public int Fullness { get; set; }
    public int Bitterness { get; set; }
    public int Sweetness { get; set; }
    public int Tannins { get; set; }

    // user input
    public WineUserDetailsDto UserDetails { get; set; } = new();
}