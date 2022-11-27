using EventWebApp.Contracts.DTOs.Category;
using EventWebApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventWebApp.Domain.Abstraction.Repositories
{
    public interface ICategoryRepository
    {
        Task<List<CategoryDto>> GetAllAsync();
        Task<CategoryDto> GetByIdAsync(int id);
        Task<Category> CreateAsync(Category createdCategory);
        Task<Category> UpdateAsync(Category updatedCategory);
        Task<bool> DeleteAsync(int id);

    }
}
