using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoApp.domain.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string Task { get; set; }

        public bool IsCompleted { get; set; }
        public DateTime DueDate { get; set; }
        public string Description { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
