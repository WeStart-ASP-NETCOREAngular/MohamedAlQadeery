namespace BookStore.API.DTOs.Book.Repsonse
{
    public class BookResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }

        public string Image { get; set; }


        public int AuthorId { get; set; }

        public int TranslatorId { get; set; }


        public int PublisherId { get; set; }

        public int CategoryId { get; set; }

    }
}
