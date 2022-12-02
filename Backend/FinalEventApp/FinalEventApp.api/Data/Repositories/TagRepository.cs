using FinalEventApp.api.Abstractions.Repositories;
using FinalEventApp.api.DTOs;
using FinalEventApp.api.Models;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace FinalEventApp.api.Data.Repositories
{
    public class TagRepository : ITagRepository
    {
        private readonly EventAppDbContext _context;

        public TagRepository(EventAppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TagResponseDto>> GetAllTagsAsync()
        {
            return await _context.Tags.ProjectToType<TagResponseDto>().ToListAsync();
        }

        public async Task<Tag> GetTagByIdAsync(int id)
        {
            return await _context.Tags.FindAsync(id);
        }

        public async Task<Tag> CreateAsync(Tag tagToCreate)
        {
            await _context.Tags.AddAsync(tagToCreate);
            await _context.SaveChangesAsync();
            return tagToCreate;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var tag = await _context.Tags.FindAsync(id);
            if (tag == null) return false;

            _context.Tags.Remove(tag);
            return await _context.SaveChangesAsync() > 0;

        }



        public async Task<Tag> UpdateAsync(int id, Tag tagToUpdate)
        {
            var tag = await _context.Tags.FindAsync(id);
            if (tag == null) return tag;

            tag.Name = tagToUpdate.Name;
            await _context.SaveChangesAsync();

            return tag;
        }
    }
}
