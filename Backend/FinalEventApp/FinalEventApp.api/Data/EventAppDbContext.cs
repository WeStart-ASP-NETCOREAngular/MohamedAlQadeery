using FinalEventApp.api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FinalEventApp.api.Data
{
    public class EventAppDbContext : IdentityDbContext<AppUser>
    {
        public EventAppDbContext(DbContextOptions<EventAppDbContext> options) : base(options)
        {

        }


         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            SeedCategories(modelBuilder);
            SeedTags(modelBuilder);
            SeedRoles(modelBuilder);
            SeedAdmin(modelBuilder);
            SeedUser(modelBuilder);

            modelBuilder.Entity<EventTag>().HasKey(et => new { et.EventId, et.TagId });
            modelBuilder.Entity<EventUser>().HasKey(eu => new { eu.EventId, eu.AppUserId });
        }

      

        public DbSet<AppUser>  Users { get; set; }
        public DbSet<Tag>  Tags { get; set; }
        public DbSet<Category>  Categories { get; set; }
        public DbSet<EventTag> EventTags { get; set; }
        public DbSet<EventUser> EventUsers { get; set; }
        public DbSet<Event> Events { get; set; }



        private static void SeedUser(ModelBuilder modelBuilder)
        {
            var user = new AppUser
            {
                Id = "b5feebcf-f317-4117-81c5-f95c98e3999e",
                Email = "user@user.com",
                EmailConfirmed = true,
                FirstName = "Mohamed",
                LastName = "alQadeery",
                UserName = "MohamedAlQadeery",
                NormalizedUserName = "MOHAMEDALQADEERY"
            };

            PasswordHasher<AppUser> ph = new PasswordHasher<AppUser>();
            user.PasswordHash = ph.HashPassword(user, "123123");
            modelBuilder.Entity<AppUser>().HasData(user);
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                UserId = "b5feebcf-f317-4117-81c5-f95c98e3999e",
                RoleId = "71393735-c1b2-4c1c-b2ba-bb29355fe538"
            });
        }

        private static void SeedAdmin(ModelBuilder modelBuilder)
        {
            var admin = new AppUser
            {
                Id = "65574566-fef6-4857-903b-af23c2d795e9",
                Email = "admin@admin.com",
                EmailConfirmed = true,
                FirstName = "admin",
                LastName = "admin",
                UserName = "admin",
                NormalizedUserName = "ADMIN"
            };

            PasswordHasher<AppUser> ph = new PasswordHasher<AppUser>();
            admin.PasswordHash = ph.HashPassword(admin, "123123");
            modelBuilder.Entity<AppUser>().HasData(admin);
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                UserId = "65574566-fef6-4857-903b-af23c2d795e9",
                RoleId = "a4d4356d-fcad-46c9-9f9b-c678bfd7b333"
            });
        }

        private static void SeedRoles(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Name = "admin",
                NormalizedName = "ADMIN",
                Id = "a4d4356d-fcad-46c9-9f9b-c678bfd7b333",
                ConcurrencyStamp = "a4d4356d-fcad-46c9-9f9b-c678bfd7b333"
            });
            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Name = "user",
                NormalizedName = "USER",
                Id = "71393735-c1b2-4c1c-b2ba-bb29355fe538",
                ConcurrencyStamp = "71393735-c1b2-4c1c-b2ba-bb29355fe538"
            });
        }

        private static void SeedTags(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tag>().HasData(
                       new Tag { Id = 1, Name = "WorldCup" },
                       new Tag { Id = 2, Name = "FPS" },
                       new Tag { Id = 3, Name = "Music" },
                       new Tag { Id = 4, Name = "FIFA" }
                       );
        }

        private static void SeedCategories(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
                          new Category { Id = 1, Name = "Sport" },
                          new Category { Id = 2, Name = "Gaming" }
                          );
        }
    }
}
