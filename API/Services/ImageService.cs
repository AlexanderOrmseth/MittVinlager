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

    public async Task<ImageUploadResult> AddImageAsync(string productId, int userId)
    {
        var uploadResult = new ImageUploadResult();

        if (productId.Length > 0 && productId.IsNumeric())
        {
            var uploadParams = new ImageUploadParams
            {
                PublicIdPrefix = $"user{userId}",
                File = new FileDescription(VinmonopoletImageUrl(productId)),
                Transformation = new Transformation().Height(300).Width(300).Crop("limit").Quality(90)
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        return uploadResult;
    }

    public async Task<ImageUploadResult> AddImageFromFileAsync(IFormFile file, int userId)
    {
        var uploadResult = new ImageUploadResult();

        if (file.Length > 0 && file.ContentType.Contains("image"))
        {
            await using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                PublicIdPrefix = $"user{userId}",
                File = new FileDescription(file.FileName, stream),
                Transformation = new Transformation().Height(300).Width(300).Crop("limit").Quality(90)
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        return uploadResult;
    }

    public async Task<ImageUploadResult> UpdateImageFromFileAsync(IFormFile file, string publicId)
    {
        var uploadResult = new ImageUploadResult();

        if (file.Length > 0 && file.ContentType.Contains("image"))
        {
            await using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                PublicId = publicId,
                Invalidate = true,
                Overwrite = true,
                File = new FileDescription(file.FileName, stream),
                Transformation = new Transformation().Height(300).Width(300).Crop("limit").Quality(90)
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        return uploadResult;
    }

    public async Task<ImageUploadResult> UpdateImageAsync(string productId, string publicId)
    {
        var uploadResult = new ImageUploadResult();

        if (productId.Length > 0 && productId.IsNumeric() && productId.Length > 0)
        {
            var uploadParams = new ImageUploadParams
            {
                PublicId = publicId,
                Invalidate = true,
                Overwrite = true,
                File = new FileDescription(VinmonopoletImageUrl(productId)),
                Transformation = new Transformation().Height(300).Width(300).Crop("limit").Quality(90)
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

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

    private static string VinmonopoletImageUrl(string productId)
    {
        return $"https://bilder.vinmonopolet.no/cache/300x300-0/{productId}-1.jpg";
    }
}