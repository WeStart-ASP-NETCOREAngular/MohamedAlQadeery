using PortfolioApp.Core.DTOs;
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
        Task<List<ListPostDto>> GetAllAsync();
        Task<bool> UpdateAsync(int id, Post post);
        Task<Post> GetByIdAsync(int id);
        
       
        
    }
}
