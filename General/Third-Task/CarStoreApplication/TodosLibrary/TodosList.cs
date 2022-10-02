using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodosLibrary
{
    public  class TodosList :List<Todo>
    {
        public TodosList(List<Todo> todos)
        {
            AddRange(todos);
        }


        public IEnumerable<Todo> GetCompletedTasks()
        {
            return this.Where(t => t.status == Status.COMPLETED);
        }

        public IEnumerable<Todo> GetInProgressTasks()
        {
            return this.Where(t => t.status == Status.IN_PROGRESS);
        }

        public int GetDeletedTasksCount()
        {
            return this.Where(t => t.status == Status.DELETED).Count();

        }

    }
}
