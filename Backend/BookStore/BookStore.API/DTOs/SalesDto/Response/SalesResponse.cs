using BookStore.API.DTOs.AppUserDto.Response;
using BookStore.API.DTOs.BookDto.Repsonse;

namespace BookStore.API.DTOs.SalesDto.Response
{
    public class SalesResponse
    {
        public int Id { get; set; }

        public BookResponse Book { get; set; }
        public AppUserResponse AppUser { get; set; }


        public int Amount { get; set; }

        public int TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
