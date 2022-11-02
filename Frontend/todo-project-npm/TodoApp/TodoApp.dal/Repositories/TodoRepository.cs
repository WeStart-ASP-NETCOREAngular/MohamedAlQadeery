using Mapster;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoApp.core.DTOs;
using TodoApp.domain.Abstraction.Repositories;
using TodoApp.domain.Models;

namespace TodoApp.dal.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoAppDbContext _context;

        public TodoRepository(TodoAppDbContext context)
        {
            _context = context;
        }
        public async Task<Todo> CreateAsync(Todo createdTodo)
        {
             await _context.Todos.AddAsync(createdTodo);

            await _context.SaveChangesAsync();
            return createdTodo;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null) return false;
            _context.Todos.Remove(todo);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<ListTodoDto>> GetAllAsync()
        {
            return await _context.Todos.ProjectToType<ListTodoDto>().ToListAsync();

        }

        public async Task<Todo> GetByIdAsync(int id)
        {
            return await _context.Todos.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<Todo> UpdateAsync(Todo updatedTodo)
        {
            _context.Todos.Update(updatedTodo);
            await _context.SaveChangesAsync();
            return updatedTodo;
        }
    }
}
