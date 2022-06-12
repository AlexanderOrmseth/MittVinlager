using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Entities;

[Table("WishItems")]
public class WishItem
{
    [Required] public int Id { get; set; }
    [JsonIgnore] [Required] public int UserId { get; set; }
    [JsonIgnore] public virtual User User { get; set; }
    [Required] public string Name { get; set; } = null!;
    [Required] public string Type { get; set; } = null!;
    [Required] public string ProductId { get; set; } = null!;

    public string? PublicId { get; set; }
    public string? PictureUrl { get; set; }

    public string? Country { get; set; }
    public int? Price { get; set; }
    public int? AlcoholContent { get; set; }
}