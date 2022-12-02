using FinalEventApp.api.DTOs;
using FinalEventApp.api.Models;

namespace FinalEventApp.api.Abstractions.Repositories
{
    public interface ITagRepository
    {
        Task<List<TagResponseDto>> GetAllTagsAsync();
        Task<Tag> GetTagByIdAsync(int id);
        Task<Tag> CreateAsync(Tag tagToCreate);
        Task<Tag> UpdateAsync(int id, Tag tagToUpdate);
        Task<bool> DeleteAsync(int id);
    }
}
