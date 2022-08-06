using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class AddWishItemDto
{
    [Required(ErrorMessage = "Navn på vin er påkrevd.")]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "Type er påkrevd.")]
    public string Type { get; set; } = null!;

    [Required(ErrorMessage = "ProduktId er påkrevd.")]
    public string ProductId { get; set; } = null!;

    public string? Country { get; set; }
    public int? Price { get; set; }
    public int? AlcoholContent { get; set; }
}