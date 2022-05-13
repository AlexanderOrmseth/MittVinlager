using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

// same as login + email
public class RegisterDto : LoginDto
{
    [Required] public string Email { get; set; } = null!;
}