namespace API.DTOs;

public class VinmonopoletDto : WineBaseModel
{
    public IEnumerable<string>? RecommendedFood { get; set; }
    public IEnumerable<string>? Grapes { get; set; }
}