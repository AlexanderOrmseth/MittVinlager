using Newtonsoft.Json;

namespace API.Entities;

public class WineUserDetails
{
    [JsonIgnore] public int Id { get; set; }

    [JsonIgnore] public Wine Wine { get; set; }

    public int Quantity { get; set; } = 1;
    public string? PurchaseLocation { get; set; }
    public DateTime? PurchaseDate { get; set; }
    public int? DrinkingWindowMin { get; set; }
    public int? DrinkingWindowMax { get; set; }
    public string? UserNote { get; set; }
    public bool Favorite { get; set; }
    public int? Score { get; set; }
    public int? UserRating { get; set; }
}