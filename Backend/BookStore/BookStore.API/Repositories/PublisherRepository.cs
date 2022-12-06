﻿using BookStore.API.Data;
using BookStore.API.Interfaces.Repositories;
using BookStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Repositories
{
    public class PublisherRepository :IPublisherRepository
    {
        private readonly BookStoreDbContext _context;

        public PublisherRepository(BookStoreDbContext context)
        {
            _context = context;
        }

        public async Task<List<Publisher>> GetAllPublishersAsync()
        {
            return await _context.Publishers.ToListAsync();
        }

        public async Task<Publisher> GetPublisherByIdAsync(int id)
        {
            return await _context.Publishers.FindAsync(id);
        }


        public async Task<Publisher> CreateAsync(Publisher publisherToCreate)
        {
            await _context.AddAsync(publisherToCreate);
            await _context.SaveChangesAsync();
            return publisherToCreate;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var publisher = await _context.Publishers.FindAsync(id);
            if (publisher == null) return false;

            _context.Publishers.Remove(publisher);
            return await _context.SaveChangesAsync() > 0;
        }



        public async Task<Publisher> UpdateAsync(int id, Publisher publisherToUpdate)
        {
            var publisher = await _context.Publishers.FirstOrDefaultAsync(a => a.Id == id);
            if (publisher == null) return null;

            publisher.Name = publisherToUpdate.Name;
            publisher.Logo = publisherToUpdate.Logo;

            await _context.SaveChangesAsync();

            return publisher;
        }
    }
}
