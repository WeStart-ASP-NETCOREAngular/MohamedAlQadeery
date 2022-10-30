using Microsoft.EntityFrameworkCore;
using PortfolioApp.Domain.Abstraction.Repositories;
using PortfolioApp.Domain.Models;
using Mapster;
using PortfolioApp.Core.DTOs;

namespace PortfolioApp.Dal.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly PortfolioAppDbContext _context;

        public PostRepository(PortfolioAppDbContext context)
        {
            _context = context;
        }
        public async Task<Post> AddAsync(Post post)
        {
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return post;
        }

        public async Task<List<ListPostDto>> GetAllAsync()
        {
            return await _context.Posts.ProjectToType<ListPostDto>().ToListAsync();
        }

        public async Task<Post> GetByIdAsync(int id)
        {
            return await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<bool> RemoveAsync(int id)
        {
            var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
            _context.Posts.Remove(post);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateAsync(int id, Post post)
        {
            var updatedPost = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
          
            if (updatedPost == null) return false;
            updatedPost.Title = post.Title;
            updatedPost.Body = post.Body;
            _context.Posts.Update(updatedPost);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
