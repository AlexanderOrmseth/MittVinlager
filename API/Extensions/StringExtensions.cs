namespace API.Extensions;

public static class StringExtensions
{
    public static bool IsEmpty(this string? value) => string.IsNullOrWhiteSpace(value);

    public static bool IsNotEmpty(this string? value) => !string.IsNullOrWhiteSpace(value);

    public static bool IsEqual(this string? value, string compareWith) =>
        value?.Equals(compareWith) ?? false;

    public static bool IsNotEqual(this string? value, string compareWith) =>
        !value?.Equals(compareWith) ?? false;

    public static string Trimmed(this string value) => value.Trim();

    public static string RemoveWhitespace(this string input)
    {
        return new string(input.ToCharArray()
            .Where(c => !char.IsWhiteSpace(c))
            .ToArray());
    }

    public static bool IsAlphaNumeric(this string value) =>
        !string.IsNullOrWhiteSpace(value) && value.All(char.IsLetterOrDigit);

    public static bool IsNumeric(this string value) => !string.IsNullOrWhiteSpace(value) && value.All(char.IsDigit);
}