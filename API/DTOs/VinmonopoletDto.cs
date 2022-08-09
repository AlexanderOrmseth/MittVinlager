namespace API.DTOs;

public class VinmonopoletDto : WineBaseModel
{
    public List<string>? RecommendedFood { get; set; }
    public List<string>? Grapes { get; set; }
}