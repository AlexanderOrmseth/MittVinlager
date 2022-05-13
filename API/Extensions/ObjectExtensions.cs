namespace API.Extensions;

public static class ObjectExtensions
{
    /// <summary>
    /// Object is null.
    /// </summary>
    /// <param name="value"></param>
    /// <returns>True if object is null.</returns>
    public static bool IsNull(this object? value) => value == null;

    /// <summary>
    /// Object is not null.
    /// </summary>
    /// <param name="value"></param>
    /// <returns>True if object is not null.</returns>
    public static bool IsNotNull(this object? value) => value != null;
}