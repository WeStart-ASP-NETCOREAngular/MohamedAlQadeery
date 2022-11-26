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
