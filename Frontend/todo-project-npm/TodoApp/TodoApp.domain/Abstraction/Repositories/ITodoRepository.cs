using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoApp.domain.Models;

namespace TodoApp.domain.Abstraction.Repositories
{
    public interface ITodoRepository
    {
        List<Todo> GetAllAsync();
        Task<Todo> GetByIdAsync(int id);

        Task<Todo> CreateAsync(Todo createdTodo);

        Task<Todo> UpdateAsync(Todo updatedTodo, int id);
        Task DeleteAsync(int id);

    }
}
