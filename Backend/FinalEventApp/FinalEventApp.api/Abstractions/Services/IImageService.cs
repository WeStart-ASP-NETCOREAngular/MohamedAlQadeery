namespace FinalEventApp.api.Abstractions.Services
{
    public interface IImageService
    {
        string UploadImage(IFormFile imageFile);
        string GetUploadedImagePath(string fileName);
    }
}
