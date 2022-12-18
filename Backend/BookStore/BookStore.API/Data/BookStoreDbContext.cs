using BookStore.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Data
{
    public class BookStoreDbContext : IdentityDbContext<AppUser>
    {
        public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserFavs>().HasKey(uf => new { uf.AppUserId, uf.BookId });

            AutoIncludeBookRelations(builder);
            SeedUser(builder);
            OneToManyRelationships(builder);

            SeedRolesData(builder);

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

        public DbSet<Address> Addresses { get; set; }






        private static void AutoIncludeBookRelations(ModelBuilder builder)
        {
            builder.Entity<Book>().Navigation(b => b.Author).AutoInclude();
            builder.Entity<Book>().Navigation(b => b.Category).AutoInclude();
            builder.Entity<Book>().Navigation(b => b.Translator).AutoInclude();
            builder.Entity<Book>().Navigation(b => b.Publisher).AutoInclude();
        }

        private static void OneToManyRelationships(ModelBuilder builder)
        {
            builder.Entity<Book>()
                        .HasOne(b => b.Author).WithMany(a => a.Books).HasForeignKey(b => b.AuthorId);


            builder.Entity<Book>()
            .HasOne(b => b.Category).WithMany(c => c.Books).HasForeignKey(b => b.CategoryId);
            builder.Entity<Book>()
            .HasOne(b => b.Translator).WithMany(t => t.Books).HasForeignKey(b => b.TranslatorId);

            builder.Entity<Book>()
           .HasOne(b => b.Publisher).WithMany(p => p.Books).HasForeignKey(b => b.PublisherId);

            builder.Entity<BookReviews>()
           .HasOne(br => br.Book).WithMany(b => b.BookReviews).HasForeignKey(br => br.BookId);
        }

        private static void SeedUser(ModelBuilder modelBuilder)
        {
            var user = new AppUser
            {
                Id = "b5feebcf-f317-4117-81c5-f95c98e3999e",
                Email = "user@user.com",
                NormalizedEmail = "USER@USER.com",
                EmailConfirmed = true,
                FirstName = "Mohamed",
                LastName = "alQadeery",
                UserName = "MohamedAlQadeery",
                NormalizedUserName = "MOHAMEDALQADEERY"
            };

            PasswordHasher<AppUser> ph = new PasswordHasher<AppUser>();
            user.PasswordHash = ph.HashPassword(user, "123123");
            modelBuilder.Entity<AppUser>().HasData(user);

        }


        private static void SeedRolesData(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>()
               .HasData(new IdentityRole { Name = "admin", NormalizedName = "ADMIN" });
            builder.Entity<IdentityRole>()
                .HasData(new IdentityRole { Name = "user", NormalizedName = "USER" });
        }

    }
}
