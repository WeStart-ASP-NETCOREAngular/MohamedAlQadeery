using EventWebApp.Contracts.DTOs.Tag;
using EventWebApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventWebApp.Domain.Abstraction.Repositories
{
    public interface ITagRepository
    {
        Task<List<ListTagDto>> GetAllAsync();
        Task<ListTagDto> GetByIdAsync(int id);
        Task<Tag> CreateAsync(Tag createdTag);
        Task<Tag> UpdateAsync(int id,Tag updatedTag);
        Task<bool> DeleteAsync(int id);
    }
}
