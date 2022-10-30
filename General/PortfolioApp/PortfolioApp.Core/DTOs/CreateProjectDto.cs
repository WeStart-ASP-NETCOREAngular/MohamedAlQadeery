using Microsoft.AspNetCore.Http;

namespace PortfolioApp.Core.DTOs
{
    public class CreateProjectDto
    {
        public string Title { get; set; }
        public IFormFile ImageFile { get; set; }
      
        public string Url { get; set; }
    }
}
