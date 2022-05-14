namespace API.Extensions;

public static class IntExtensions
{
    public static int? NotZero(this int value) => value == 0 ? null : value;
}