using DomainLayer.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class BookStoreApiDbContext : IdentityDbContext
    {
        public BookStoreApiDbContext(DbContextOptions<BookStoreApiDbContext> options) : base(options)
        {

        }

        public DbSet<Book> Books { get; set; }
    }
}
