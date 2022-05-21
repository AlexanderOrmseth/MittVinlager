namespace API.DTOs;

public class WineDto : WineBaseModel
{
    public int WineId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public string? PictureUrl { get; set; }
}