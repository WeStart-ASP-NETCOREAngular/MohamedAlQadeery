using System.ComponentModel.DataAnnotations;

namespace BookStore.API.DTOs.BookReviewsDto.Request
{
    public class AddBookReviewRequest
    {
       
        

        [Required]

        public int BookId { get; set; }

        [Required]

        [Range(1,5)]
        public int Rate { get; set; }
        [Required]

        public string Comment { get; set; }
    }
}
