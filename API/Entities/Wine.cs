using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;


namespace API.Entities;

[Table("Wine")]
public class Wine
{
    // ids
    [Required] public int WineId { get; set; }

    [JsonIgnore] [Required] public int UserId { get; set; }

    [JsonIgnore] public virtual User User { get; set; }

    // required
    [Required] public string Name { get; set; } = null!;
    [Required] public string Type { get; set; } = null!;

    // optional
    [Range(0, 3000)] public int? Year { get; set; }
    public int? Price { get; set; }
    public double? Volume { get; set; }
    public int? AlcoholContent { get; set; }
    public string? Country { get; set; }
    public string? CountryId { get; set; }
    public string? Region { get; set; }
    public string? SubRegion { get; set; }
    public string? ProductId { get; set; }
    public string? Grapes { get; set; }

    public string? ManufacturerName { get; set; } // 1 to 1
    public string? StoragePotential { get; set; } // 1 to 1

    public string? Colour { get; set; }
    public string? Odour { get; set; }
    public string? Taste { get; set; }

    // image
    public string? PublicId { get; set; }
    public string? PictureUrl { get; set; }

    // taste values
    public int Freshness { get; set; }
    public int Fullness { get; set; }
    public int Bitterness { get; set; }
    public int Sweetness { get; set; }
    public int Tannins { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; } = null;

    [JsonIgnore] public WineUserDetails UserDetailses { get; set; }


    public Wine()
    {
    }

    public Wine(int userId)
    {
        UserId = userId;
    }
}