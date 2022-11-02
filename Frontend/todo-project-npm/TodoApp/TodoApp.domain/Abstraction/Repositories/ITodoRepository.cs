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
        Task<Category> GetByIdAsync(int id);
        Task<Category> CreateAsync(Todo createdTodo);
        Task<Category> UpdateAsync(Todo updatedTodo);
        Task<bool> DeleteAsync(int id);

    }
}
