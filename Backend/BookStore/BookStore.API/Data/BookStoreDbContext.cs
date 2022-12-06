using BookStore.API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Data
{
    public class BookStoreDbContext :IdentityDbContext<AppUser>
    {
        public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserFavs>().HasKey(uf => new { uf.AppUserId, uf.BookId });

            

           

            

            base.OnModelCreating(builder);
        }


        public DbSet<Author> Authors { get; set; }
        public DbSet<Translator> Translators { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Publisher> Publishers { get; set; }

        public DbSet<Book> Books { get; set; }

        public DbSet<UserFavs> UserFavs { get; set; }
        public DbSet<BookReviews> BookReviews { get; set; }

        public DbSet<Zone> Zones { get; set; }

        public DbSet<Sales> Sales { get; set; }

        public DbSet<Contactus> Contactus { get; set; }
        public DbSet<StaticPages> StaticPages { get; set; }

        public DbSet<BookSuggestion> BookSuggestions { get; set; }

    }
}
