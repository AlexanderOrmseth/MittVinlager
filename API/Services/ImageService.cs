using API.Extensions;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace API.Services;

public class ImageService
{
    private readonly Cloudinary _cloudinary;

    public ImageService(IConfiguration config)
    {
        var acc = new Account(
            config["Cloudinary:CloudName"],
            config["Cloudinary:APIKey"],
            config["Cloudinary:APISecret"]);

        _cloudinary = new Cloudinary(acc);
    }

    /// <summary>
    /// Reduces image resolution
    /// </summary>
    /// <param name="size">
    /// Size is max image width/height
    /// </param>
    private Transformation ImageTransformation(bool small = false)
    {
        var size = small ? 100 : 300;
        return new Transformation().Height(size).Width(size).Crop("limit").Quality(90);
    }

    public async Task<ImageUploadResult> AddImageAsync(string productId, int userId, bool small = false)
    {
        var uploadParams = new ImageUploadParams
        {
            PublicIdPrefix = $"user{userId}",
            File = new FileDescription(VinmonopoletImageUrl(productId)),
            Transformation = ImageTransformation(small)
        };
        var uploadResult = await _cloudinary.UploadAsync(uploadParams);

        return uploadResult;
    }

    public async Task<ImageUploadResult> AddImageFromFileAsync(IFormFile file, int userId)
    {
        var uploadResult = new ImageUploadResult();

        if (IsValidFile(file))
        {
            await using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                PublicIdPrefix = $"user{userId}",
                File = new FileDescription(file.FileName, stream),
                Transformation = ImageTransformation()
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        return uploadResult;
    }

    public async Task<ImageUploadResult> UpdateImageFromFileAsync(IFormFile file, string publicId)
    {
        var uploadResult = new ImageUploadResult();

        if (IsValidFile(file))
        {
            await using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                PublicId = publicId,
                File = new FileDescription(file.FileName, stream),
                Transformation = ImageTransformation()
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        return uploadResult;
    }


    public async Task<ImageUploadResult> UpdateImageAsync(string productId, string publicId)
    {
        var uploadParams = new ImageUploadParams
        {
            PublicId = publicId,
            File = new FileDescription(VinmonopoletImageUrl(productId)),
            Transformation = ImageTransformation()
        };

        var uploadResult = await _cloudinary.UploadAsync(uploadParams);

        return uploadResult;
    }

    public async Task<DeletionResult> DeleteImageAsync(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);
        var result = await _cloudinary.DestroyAsync(deleteParams);
        return result;
    }


    public async Task DeleteAllUserImages(int userId)
    {
        await _cloudinary.DeleteResourcesByPrefixAsync($"user{userId}");
    }


    private static bool IsValidFile(IFormFile file)
    {
        return file.Length > 0 && file.ContentType.Contains("image");
    }

    private static string VinmonopoletImageUrl(string productId)
    {
        return $"https://bilder.vinmonopolet.no/cache/300x300-0/{productId}-1.jpg";
    }
}