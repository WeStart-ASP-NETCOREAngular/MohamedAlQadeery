using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoApp.core.DTOs
{
    public abstract class TodoDto
    {
        [Required]

        public string Task { get; set; }


        public bool IsCompleted { get; set; }
        

    }

    public class ListTodoDto : TodoDto
    {
        public string CategoryName { get; set; }
    }

    public class CreateTodoDto : TodoDto
    {
        [Required]
        public string CategoryId { get; set; }
        public string Description { get; set; }
        [Required]

        public DateTime DueDate { get; set; }

    }


    public class UpdateTodoDto : TodoDto
    {
        [Required]

        public string CategoryId { get; set; }
       
        public string Description { get; set; }
        [Required]

        public DateTime DueDate { get; set; }
    }
}
