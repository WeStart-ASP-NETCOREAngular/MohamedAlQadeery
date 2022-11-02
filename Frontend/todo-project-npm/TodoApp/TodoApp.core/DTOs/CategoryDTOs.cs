using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoApp.core.DTOs
{

    public abstract class CategoryDto
    {
        [Required]
        public string Name { get; set; }

    }
    public class DisplayCategoryDto : CategoryDto
    {
        public int Id { get; set; }
    }


    public class CreateCategoryDto : CategoryDto
    {

    }

    public class UpdateCategoryDto : CategoryDto
    {
        

    }


    public class ShowCategoryDto : CategoryDto
    {       
        public string Name { get; set; }

        public List<ListTodoDto> Todos { get; set; }

    }




}
