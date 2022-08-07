namespace API.DTOs;

public class VinmonopoletDto : WineBaseModel
{
    public List<string>? RecommendedFood { get; set; }
    public List<string>? Grapes { get; set; }

    public static string? ListToCommaString(List<string>? list)
    {
        if (list is null || !list.Any())
        {
            return null;
        }

        return string.Join<string?>(", ", list.Select(str => str?.Trim()).ToArray());
    }
}