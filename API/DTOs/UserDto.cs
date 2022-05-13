using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UserDto
{
    [Required] public string UserName { get; set; } = null!;
    [Required] public string Email { get; set; } = null!;
    [Required] public string Token { get; set; } = null!;
}