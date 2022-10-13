using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortfolioMvc.ViewModels
{
    public class CreateProjectVM
    {
        public string Title { get; set; }
        public string? Url { get; set; }
        public IFormFile Image { get; set; }
    }
}