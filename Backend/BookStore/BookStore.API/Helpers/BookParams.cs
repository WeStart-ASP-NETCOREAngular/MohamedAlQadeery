namespace BookStore.API.Helpers
{
    public class BookParams
    {
        public int TakeCount { get; set; } = 0;

        public string? BookName { get; set; }

        public string? AuthorName { get; set; }
        public int Year { get; set; } = 0;
    }
}
