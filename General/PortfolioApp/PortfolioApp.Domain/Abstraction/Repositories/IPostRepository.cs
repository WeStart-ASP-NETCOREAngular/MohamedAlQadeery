using PortfolioApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortfolioApp.Domain.Abstraction.Repositories
{
    public interface IPostRepository
    {
        Task<Post> AddAsync(Post post);
        Task<bool> RemoveAsync(int id);
        Task<List<Post>> GetAllAsync();
        Task<bool> UpdateAsync(int id, Post post);
        Task<Post> GetByIdAsync(int id);
        
       
        
    }
}
