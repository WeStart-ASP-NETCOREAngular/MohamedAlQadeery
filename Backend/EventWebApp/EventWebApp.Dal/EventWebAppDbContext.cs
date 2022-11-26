using EventWebApp.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventWebApp.Dal
{
    public class EventWebAppDbContext : DbContext
    {


        public EventWebAppDbContext(DbContextOptions<EventWebAppDbContext> options) : base(options)
        {



        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Category>().HasData(
              new Category { Id = 1, Name="Sport" },
              new Category { Id = 2, Name="Gaming" }
              );

               modelBuilder.Entity<Tag>().HasData(
              new Tag { Id = 1, Name="WorldCup" },
              new Tag { Id = 2, Name="FPS" },
              new Tag { Id = 3, Name="Music" },
              new Tag { Id = 4, Name="FIFA" }
              );

          

            modelBuilder.Entity<EventTag>().HasKey(et => new {et.EventId,et.TagId});
            modelBuilder.Entity<EventUser>().HasKey(eu => new {eu.EventId,eu.AppUserId });
        }

        public DbSet<AppUser>  Users { get; set; }
        public DbSet<Tag>  Tags { get; set; }
        public DbSet<Category>  Categories { get; set; }
        public DbSet<EventTag> EventTags { get; set; }
        public DbSet<EventUser> EventUsers { get; set; }
        public DbSet<Event> Events { get; set; }

    }
}
