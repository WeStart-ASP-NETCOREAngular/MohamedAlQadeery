using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortfolioApp.Domain.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImagePath { get; set; }
        /*
        Project url if it was deployed (nullable)
        */
        public string? Url { get; set; }
    }
}
