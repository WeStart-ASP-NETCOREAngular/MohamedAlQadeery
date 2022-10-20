namespace PortfolioApp.Api.DTOs
{
    public class UpdateProjectDto
    {
        public string Title { get; set; }
        public IFormFile ImageFile { get; set; }

        public string Url { get; set; }
    }
}
