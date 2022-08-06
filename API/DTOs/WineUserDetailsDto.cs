using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace API.DTOs;

public class WineUserDetailsDto
{
    [Required] public int Quantity { get; set; } = 1;
    public string? PurchaseLocation { get; set; }
    public DateTime? PurchaseDate { get; set; }
    public int? DrinkingWindowMin { get; set; } = DateTime.Now.Year;
    public int? DrinkingWindowMax { get; set; }
    public string? UserNote { get; set; }
    public bool Favorite { get; set; }
    public int? Score { get; set; }
    public int? UserRating { get; set; }
}