using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoApp.core.DTOs
{
    public abstract class TodoDto
    {
        public string Task { get; set; }

        public bool IsCompleted { get; set; }
        

    }

    public class ListTodoDto : TodoDto
    {
        public string CategoryName { get; set; }
    }
}
