using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodosLibrary
{
    public class Todo
    {
        public Todo(string description, Status status)
        {
            Description = description;
            this.status = status;
        }

        public string Description { get; set; }
        public Status  status { get; set; }

       
    }


    public enum Status
    { 
        NOT_STARTED,IN_PROGRESS,COMPLETED,DELETED
    }
}
