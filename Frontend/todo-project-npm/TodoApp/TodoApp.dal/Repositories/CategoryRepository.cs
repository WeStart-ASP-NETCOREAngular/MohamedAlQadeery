using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoApp.core.DTOs;
using TodoApp.domain.Abstraction.Repositories;
using TodoApp.domain.Models;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace TodoApp.dal.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly TodoAppDbContext _context;

        public CategoryRepository(TodoAppDbContext context)
        {
            _context = context;
        }
        public async Task<Category> CreateAsync(Category createdCategory)
        {
            await _context.Categories.AddAsync(createdCategory);
            await _context.SaveChangesAsync();
            return createdCategory;


        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (category == null) return false;
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return true;

        }

        public async Task<List<DisplayCategoryDto>> GetAllAsync()
        {
            return await _context.Categories.ProjectToType<DisplayCategoryDto>().ToListAsync();
        }

        public async Task<Category> GetByIdAsync(int id)
        {
            return await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Category> UpdateAsync(Category updatedCategory, int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            if (category == null) return category;


            _context.Categories.Update(updatedCategory);
            await _context.SaveChangesAsync();
            return updatedCategory;
        }
    }
}
