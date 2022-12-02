using FinalEventApp.api.DTOs;
using FinalEventApp.api.Models;

namespace FinalEventApp.api.Abstractions.Repositories
{
    public interface ICategoryRepository
    {
        Task<List<CategoryResponseDto>> GetAllCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int id);
        Task<Category> CreateAsync(Category categoryToCreate);
        Task<Category> UpdateAsync(int id, Category categoryToUpdate);
        Task<bool> DeleteAsync(int id);
    }
}
