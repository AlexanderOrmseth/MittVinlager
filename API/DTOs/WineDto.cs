namespace API.DTOs;

public class WineDto : WineFormDto
{
    public int WineId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}