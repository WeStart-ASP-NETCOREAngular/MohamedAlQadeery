using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoApp.core.DTOs;
using TodoApp.domain.Models;

namespace TodoApp.domain.Abstraction.Repositories
{
    public interface ICategoryRepository
    {
        Task<List<DisplayCategoryDto>> GetAllAsync();
        Task<Category> GetByIdAsync(int id);
        Task<Category> CreateAsync(Category createdCategory);
        Task<Category> UpdateAsync(Category updatedCategory);
        Task<bool> DeleteAsync(int id);
    }
}
