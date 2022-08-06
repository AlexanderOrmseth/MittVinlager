using CloudinaryDotNet.Actions;

namespace API.Interfaces;

public interface IWineWithPicture
{
    public string? PublicId { get; set; }
    public string? PictureUrl { get; set; }
    void AddPicture(ImageUploadResult imageUploadResult, bool byUser = false);
}