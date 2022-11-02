using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoApp.core.DTOs;
using TodoApp.domain.Models;

namespace TodoApp.domain.Abstraction.Repositories
{
    public interface ITodoRepository
    {
        Task<List<ListTodoDto>> GetAllAsync();
        Task<Todo> GetByIdAsync(int id);
        Task<Todo> CreateAsync(Todo createdTodo);
        Task<Todo> UpdateAsync(Todo updatedTodo);
        Task<bool> DeleteAsync(int id);

    }
}
