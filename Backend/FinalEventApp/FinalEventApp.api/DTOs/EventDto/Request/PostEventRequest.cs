using Mapster;
using System.ComponentModel.DataAnnotations;

namespace FinalEventApp.api.DTOs.EventDto.Request
{
    public class PostEventRequest
    {
        [Required]
        public string Name { get; set; }
     
        [Required]

        public int? CategoryId { get; set; }
        [Required]


        public int[]? TagsId { get; set; }
        [Required]
        public IFormFile ImageFile { get; set; } 
        [Required]
        public string Description { get; set; }
        [Required]
        public string Time { get; set; } 
        [Required]
        public string Location { get; set; } 

        [Required]
        public DateTime StartDate { get; set; } 
    }  
    public class PutEventRequest
    {
        [Required]
        public string Name { get; set; }
       
        [Required]

        public int? CategoryId { get; set; }
      
        [Required]
        public int[]? TagsId { get; set; }


        public IFormFile ImageFile { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Time { get; set; }
        [Required]
        public string Location { get; set; }

        [Required]
        public DateTime StartDate { get; set; }
    }
}
