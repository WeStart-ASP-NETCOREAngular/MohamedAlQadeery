using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        [Display(Name ="Current Image")]
        public string? ImagePath { get; set; }
        //nullable
        public IFormFile? Image { get; set; }

    }

    public class ShowProjectVM : AbstractProjectVM
    {
        //we put id here so we can use it to delete the project
        public int Id { get; set; }

        public string ImagePath { get; set; }
    }
}