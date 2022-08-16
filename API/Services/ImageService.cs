using System.Net;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace API.Services;

public class ImageFileParams
{
    public IFormFile File { get; set; } = null!;
    public int? UserId { get; set; }
    public string? PublicId { get; set; }
}

public class ImageParams
{
    public string ProductId { get; set; } = null!;
    public int? UserId { get; set; }
    public string? PublicId { get; set; }
    public bool Small { get; set; }
}

public class ImageService
{
    private readonly ILogger<ImageService> _logger;
    private readonly Cloudinary _cloudinary;

    public ImageService(IConfiguration config, ILogger<ImageService> logger)
    {
        _logger = logger;
        var acc = new Account(
            config["Cloudinary:CloudName"],
            config["Cloudinary:APIKey"],
            config["Cloudinary:APISecret"]);

        _cloudinary = new Cloudinary(acc);
    }

    /// <summary>
    /// Adds or updates image by productId
    /// </summary>
    /// <param name="imageParams"></param>
    /// <returns>ImageUploadResult</returns>
    public async Task<ImageUploadResult> AddOrUpdateImageAsync(ImageParams imageParams)
    {
        return await GetUploadResult(new FileDescription(VinmonopoletImageUrl(imageParams.ProductId)),
            imageParams.PublicId, imageParams.UserId, imageParams.Small);
    }

    /// <summary>
    /// Adds or updates file image
    /// </summary>
    /// <param name="imageFileParams"></param>
    /// <returns>ImageUploadResult</returns>
    public async Task<ImageUploadResult> AddOrUpdateImageFromFileAsync(ImageFileParams imageFileParams)
    {
        await using var stream = imageFileParams.File.OpenReadStream();
        return await GetUploadResult(new FileDescription(imageFileParams.File.FileName, stream),
            imageFileParams.PublicId, imageFileParams.UserId);
    }

    /// <summary>
    /// Deletes single image with given publicId
    /// </summary>
    /// <param name="publicId">Id of image</param>
    public async Task DeleteImageAsync(string publicId)
    {
        await _cloudinary.DestroyAsync(new DeletionParams(publicId));
    }

    private async Task<ImageUploadResult> GetUploadResult(FileDescription fileDescription, string? publicId = null,
        int? userId = null, bool small = false)
    {
        var uploadParams = new ImageUploadParams
        {
            PublicIdPrefix = userId is not null ? GetIdPrefix(userId) : null,
            PublicId = publicId,
            File = fileDescription,
            Transformation = ImageTransformation(small)
        };
        return await _cloudinary.UploadAsync(uploadParams);
    }

    public async Task<List<string>> GetTestDataImages()
    {
        var searchResult = await _cloudinary.Search().Expression("TestData").MaxResults(30).ExecuteAsync();
        var imageUrlList = searchResult.Resources.Select(x => x.SecureUrl).ToList();
        return imageUrlList;
    }

    /// <summary>
    /// Deletes all stored images of user and its folder on cloudinary
    /// </summary>
    /// <param name="userId"></param>
    public async Task DeleteAllUserImages(int userId)
    {
        var path = GetIdPrefix(userId);
        var deleteImageResult = await _cloudinary.DeleteResourcesByPrefixAsync(path);
        var deletedFolderResult = await _cloudinary.DeleteFolderAsync(path);

        if (deleteImageResult.StatusCode == HttpStatusCode.OK)
        {
            _logger.LogInformation("Successfully deleted {DeletedCountsCount} images",
                deleteImageResult.DeletedCounts.Count);
        }
        else if (deleteImageResult.Error is not null)
        {
            _logger.LogInformation("Image Deletion Error: {DeletedCounts}", deleteImageResult.Error.Message);
        }

        if (deletedFolderResult.StatusCode == HttpStatusCode.OK)
        {
            _logger.LogInformation("Successfully deleted {@DeletedFolderResult} Folder", deletedFolderResult.Deleted);
        }
        else if (deletedFolderResult.Error is not null)
        {
            _logger.LogInformation("Folder Deletion Error: {DeletedFolderResult}",
                deletedFolderResult.Error.Message);
        }
    }

    /// <summary>
    /// Reduces image resolution
    /// </summary>
    /// <param name="small">
    /// Size is max image width/height
    /// </param>
    private static Transformation ImageTransformation(bool small = false)
    {
        var size = small ? 100 : 300;
        return new Transformation().Height(size).Width(size).Crop("limit").Quality(90);
    }

    /// <summary>
    /// Gets the path to image 
    /// </summary>
    private static string GetIdPrefix(int? userId)
    {
        var isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";
        var folder = isDevelopment ? "Dev" : "Prod";
        return $"{folder}/user{userId}";
    }

    private static string VinmonopoletImageUrl(string productId)
    {
        return $"https://bilder.vinmonopolet.no/cache/300x300-0/{productId}-1.jpg";
    }
}