using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UserDto
{
    [Required] public string Token { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string? DisplayName { get; set; }
}