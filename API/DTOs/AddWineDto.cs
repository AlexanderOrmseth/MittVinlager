namespace API.DTOs;

public class AddWineDto : WineBaseModel
{
    // image
    public IFormFile? File { get; set; }
    public bool ResetImage { get; set; }
}