namespace API.DTOs;

public class AddWineDto : VinmonopoletDto
{
    // image
    public IFormFile? File { get; set; }
    public bool ResetImage { get; set; }
}