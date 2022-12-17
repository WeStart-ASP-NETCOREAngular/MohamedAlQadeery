namespace BookStore.API.Helpers
{
    public class BookParams
    {
        public int TakeCount { get; set; } = 0;

        public string? bookName { get; set; }

        public string? authorName { get; set; }
        public int Year { get; set; } = 0;
    }
}
