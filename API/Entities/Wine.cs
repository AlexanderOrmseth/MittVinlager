using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Interfaces;
using CloudinaryDotNet.Actions;
using Newtonsoft.Json;


namespace API.Entities;

[Table("Wine")]
public class Wine : IWineWithPicture
{
    // ids
    [Required] public int WineId { get; set; }

    [JsonIgnore] [Required] public int UserId { get; private set; }

    [JsonIgnore] public virtual User User { get; set; }

    // required
    [Required] public string Name { get; set; } = null!;
    [Required] public string Type { get; set; } = null!;

    // if image file uploaded by user
    public bool ImageByUser { get; set; }


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
    public string? RecommendedFood { get; set; }

    public string? ManufacturerName { get; set; }
    public string? StoragePotential { get; set; }

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

    public DateTime CreatedAt { get; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    [JsonIgnore] public WineUserDetails UserDetails { get; set; }

    [JsonIgnore] public List<Consumed> Consumed { get; set; }

    public Wine(int userId)
    {
        UserId = userId;
    }

    public void AddPicture(ImageUploadResult imageUploadResult, bool byUser = false)
    {
        PictureUrl = imageUploadResult.SecureUrl.ToString();
        PublicId = imageUploadResult.PublicId;
        ImageByUser = byUser;
    }
}