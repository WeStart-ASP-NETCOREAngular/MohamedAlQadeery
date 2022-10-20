using Microsoft.EntityFrameworkCore;
using PortfolioApp.Domain.Abstraction.Repositories;
using PortfolioApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortfolioApp.Dal.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly PortfolioAppDbContext _context;

        public ProjectRepository(PortfolioAppDbContext context)
        {
            _context = context;
        }
        public async Task<Project> AddAsync(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<List<Project>> GetAllAsync()
        {
            return await _context.Projects.ToListAsync();
        }

        public async Task<Project> GetByIdAsync(int id)
        {
            return await _context.Projects.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<bool> RemoveAsync(int id)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == id);
            _context.Projects.Remove(project);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateAsync(int id, Project project)
        {
            var updatedProject = await _context.Projects.FirstOrDefaultAsync(p => p.Id == id);

            if (updatedProject == null) return false;
            updatedProject.Title = project.Title;
            updatedProject.ImagePath = project.ImagePath;
            updatedProject.Url = project.Url;
            _context.Projects.Update(updatedProject);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
