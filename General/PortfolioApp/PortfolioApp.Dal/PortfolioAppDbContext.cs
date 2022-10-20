using Microsoft.EntityFrameworkCore;
using PortfolioApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortfolioApp.Dal
{
    public class PortfolioAppDbContext : DbContext
    {
        public PortfolioAppDbContext(DbContextOptions<PortfolioAppDbContext> options) : base(options)
        {

        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Post> Posts { get; set; }

    }
    
}
