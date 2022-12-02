using FinalEventApp.api.Abstractions.Repositories;
using FinalEventApp.api.DTOs;
using FinalEventApp.api.Models;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace FinalEventApp.api.Data.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly EventAppDbContext _context;

        public CategoryRepository(EventAppDbContext context)
        {
            _context = context;
        }

        public async Task<List<CategoryResponseDto>> GetAllCategoriesAsync()
        {
            return await _context.Categories.ProjectToType<CategoryResponseDto>().ToListAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<Category> CreateAsync(Category categoryToCreate)
        {
            await _context.Categories.AddAsync(categoryToCreate);
            await _context.SaveChangesAsync();
            return categoryToCreate;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return false;

            _context.Categories.Remove(category);
            return await _context.SaveChangesAsync() > 0;

        }

     

        public async Task<Category> UpdateAsync(int id, Category categoryToUpdate)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return category;

            category.Name = categoryToUpdate.Name;
            await _context.SaveChangesAsync();

            return category;
        }
    }
}
