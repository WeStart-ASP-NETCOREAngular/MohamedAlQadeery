using EventWebApp.Contracts.DTOs.Category;
using EventWebApp.Domain.Abstraction.Repositories;
using EventWebApp.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventWebApp.Dal.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly EventWebAppDbContext _context;

        public CategoryRepository(EventWebAppDbContext ctx)
        {
            _context = ctx;
        }

        public async Task<List<ListCategoryDto>> GetAllAsync()
        {
            return await _context.Categories.Select(c => new ListCategoryDto
            { Id=c.Id,Name = c.Name,CreatedAt=c.CreatedAt}).ToListAsync();
        }

        public async Task<ListCategoryDto> GetByIdAsync(int id)
        {
            return await _context.Categories.AsNoTracking().Select(c => new ListCategoryDto { Name =c.Name,Id=c.Id,CreatedAt=c.CreatedAt}).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Category> CreateAsync(Category createdCategory)
        {
            await _context.Categories.AddAsync(createdCategory);
            await _context.SaveChangesAsync();
            return createdCategory;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return false;
            _context.Categories.Remove(category);
            return await _context.SaveChangesAsync() > 0;
        }

    
        public async Task<Category> UpdateAsync(int id,Category updatedCategory)
        {
            var categoryToUpdate = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if(categoryToUpdate == null) { return null; }
            categoryToUpdate.Name = updatedCategory.Name;

            _context.Categories.Update(categoryToUpdate);
            await _context.SaveChangesAsync();
            return categoryToUpdate;
        }
    }
}
