namespace API.RequestHelpers;

public class WineParams : PaginationParams
{
    public string? OrderBy { get; set; }
    public string? SearchTerm { get; set; }
    public string? Types { get; set; }
    public string? Countries { get; set; }
    public string? Grapes { get; set; }
}