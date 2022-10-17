using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class BookStoreApiDbContext : DbContext
    {
        public BookStoreApiDbContext(DbContextOptions<BookStoreApiDbContext> options) : base(options)
        {

        }

        public DbSet<Book> Books { get; set; }
    }
}
