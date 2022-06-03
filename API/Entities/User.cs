using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace API.Entities;

public class User : IdentityUser<int>
{
    [JsonIgnore] public List<Wine>? Wines { get; set; }
    [JsonIgnore] public List<WishItem>? Wishlist { get; set; }
}