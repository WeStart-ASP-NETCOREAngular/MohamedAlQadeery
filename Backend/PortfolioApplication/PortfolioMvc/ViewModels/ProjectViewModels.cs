using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortfolioMvc.ViewModels
{
    public abstract class AbstractProjectVM
    {
        public string Title { get; set; }
        public string? Url { get; set; }
    }


    public class CreateProjectVM : AbstractProjectVM
    {
        //required
        public IFormFile Image { get; set; }

    }


    public class EditProjectVM : AbstractProjectVM
    {
        public int Id { get; set; }

        //to display current Image in edit view
        public string ImagePath { get; set; }
        //nullable
        public IFormFile? Image { get; set; }

    }
}