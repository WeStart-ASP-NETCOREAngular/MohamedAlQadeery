using BookStore.API.Interfaces.Services;

namespace BookStore.API.Services
{
    public class ImageService : IImageService
    {
        private const string uploadDir = "./wwwroot/images";

        public string UploadImage(IFormFile imageFile)
        {
            if (!imageFile.ContentType.StartsWith("image/"))
            {
                return "";
            }

            // ContentType = "image/jpeg"
            // Output: "jpeg"
            var fileExtension = imageFile.ContentType.Split('/')[1];
            var fileName = Guid.NewGuid().ToString();
            fileName = $"{fileName}.{fileExtension}";
            StoreUploadedImage(imageFile, fileName);

            return fileName;

        }

        private  void StoreUploadedImage(IFormFile imageFile, string fileName)
        {
            if (!Directory.Exists(uploadDir))
            {
                Directory.CreateDirectory(uploadDir);
            }

            var filePath = Path.Combine(uploadDir, fileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                imageFile.CopyTo(fileStream);
            }
        }

        public string GetUploadedImage(string fileName)
        {
            return Path.Combine(uploadDir, fileName);
        }

       

       
    }
}
