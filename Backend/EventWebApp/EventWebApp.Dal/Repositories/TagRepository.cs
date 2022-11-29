using EventWebApp.Contracts.DTOs.Tag;
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
    public class TagRepository : ITagRepository
    {
        private readonly EventWebAppDbContext _context;

        public TagRepository(EventWebAppDbContext ctx)
        {
            _context = ctx;
        }

        public async Task<List<ListTagDto>> GetAllAsync()
        {
            return await _context.Tags.Select(c => new ListTagDto
            { Id = c.Id, Name = c.Name, CreatedAt = c.CreatedAt }).ToListAsync();
        }

        public async Task<ListTagDto> GetByIdAsync(int id)
        {
            return await _context.Tags.AsNoTracking().Select(c => new ListTagDto { Name = c.Name, Id = c.Id, CreatedAt = c.CreatedAt }).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Tag> CreateAsync(Tag createdTag)
        {
            await _context.Tags.AddAsync(createdTag);
            await _context.SaveChangesAsync();
            return createdTag;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var Tag = await _context.Tags.FindAsync(id);
            if (Tag == null) return false;
            _context.Tags.Remove(Tag);
            return await _context.SaveChangesAsync() > 0;
        }


        public async Task<Tag> UpdateAsync(int id, Tag updatedTag)
        {
            var TagToUpdate = await _context.Tags.FirstOrDefaultAsync(c => c.Id == id);
            if (TagToUpdate == null) { return null; }
            TagToUpdate.Name = updatedTag.Name;

            _context.Tags.Update(TagToUpdate);
            await _context.SaveChangesAsync();
            return TagToUpdate;
        }

    }
}
