using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoApp.core.DTOs
{

    public abstract class CategoryDto
    {
        public string Name { get; set; }

    }
    public class ListCategoryDto : CategoryDto
    {
        public int Id { get; set; }
    }


    public class CreateCategoryDto : CategoryDto
    {

    }

    public class UpdateCategoryDto : CategoryDto
    {
        public string Name { get; set; }

    }


    public class ShowCategoryDto : CategoryDto
    {       
        public string Name { get; set; }

        public List<ListTodoDto> Todos { get; set; }

    }




}
