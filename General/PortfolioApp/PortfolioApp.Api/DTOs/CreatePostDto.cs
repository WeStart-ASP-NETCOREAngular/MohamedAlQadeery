using System.ComponentModel.DataAnnotations;

namespace PortfolioApp.Api.DTOs
{
    public class CreatePostDto
    {
        [Required]
        public string Title { get; set; }
        public string Body { get; set; }
    }
}
