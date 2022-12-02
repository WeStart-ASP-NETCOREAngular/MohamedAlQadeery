using System.ComponentModel.DataAnnotations;

namespace FinalEventApp.api.DTOs
{
    public class CreateTagyDto
    {
        [Required]
        public string Name { get; set; }
    }


    public class UpdateTagDto
    {
        [Required]
        public string Name { get; set; }
    }
}
