namespace API.DTOs;

public class WineDto : VinmonopoletDto
{
    public int WineId { get; set; }
    public bool ImageByUser { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? PictureUrl { get; set; }
}