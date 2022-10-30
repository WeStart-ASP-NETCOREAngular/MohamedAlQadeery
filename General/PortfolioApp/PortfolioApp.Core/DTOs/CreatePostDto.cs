using System.ComponentModel.DataAnnotations;

namespace PortfolioApp.Core.DTOs
{
    public class CreatePostDto
    {
        [Required]
        public string Title { get; set; }
        public string Body { get; set; }
    }
}
