using PortfolioApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortfolioApp.Domain.Abstraction.Repositories
{
    public interface IProjectRepository
    {
        Task<Project> AddAsync(Project post);
        Task<bool> RemoveAsync(int id);
        Task<List<Project>> GetAllAsync();
        Task<bool> UpdateAsync(int id, Project post);
        Task<Project> GetByIdAsync(int id);

    }
}
