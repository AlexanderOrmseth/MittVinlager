using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class WishItemDto : AddWishItemDto
{
    [Required] public int Id { get; set; }
}