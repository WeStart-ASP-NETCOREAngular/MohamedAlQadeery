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
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == createdTodo.CategoryId);
            if (category == null) return null;
            await _context.Todos.AddAsync(createdTodo);
            //tmp line need to be fixed 
           // createdTodo.Category =category;
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
            return await _context.Todos.Include(t=>t.Category).AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<Todo> UpdateAsync(Todo updatedTodo)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == updatedTodo.CategoryId);
            if (category == null) return null;
            updatedTodo.Category = category;

            _context.Todos.Update(updatedTodo);
            await _context.SaveChangesAsync();
            return updatedTodo;
        }
    }
}
