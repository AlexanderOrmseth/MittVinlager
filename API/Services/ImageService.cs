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

    public async Task<ImageUploadResult> AddImageAsync(string productId)
    {
        var uploadResult = new ImageUploadResult();

        if (productId.Length > 0)
        {
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription("https://bilder.vinmonopolet.no/cache/300x300-0/" + productId + "-1.jpg")
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
}