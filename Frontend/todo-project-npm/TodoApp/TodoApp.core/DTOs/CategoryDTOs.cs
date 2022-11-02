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
       
        public string Name { get; set; }

    }

    // display in list , and return from create/update
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


    // in GetById action  (display full info)
    public class ShowCategoryDto : CategoryDto
    {       

        public List<ListTodoDto> Todos { get; set; }

    }




}
