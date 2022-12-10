namespace BookStore.API.Interfaces.Services
{
    public interface IImageService
    {
         string UploadImage(IFormFile imageFile);
        string GetUploadedImage(string fileName);
    }
}
