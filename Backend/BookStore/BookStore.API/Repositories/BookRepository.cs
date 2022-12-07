using BookStore.API.Data;
using BookStore.API.Interfaces.Repositories;
using BookStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly BookStoreDbContext _context;

        public BookRepository(BookStoreDbContext context)
        {
            _context = context;
        }

        public async Task<List<Book>> GetAllBooksAsync()
        {
            return await _context.Books.ToListAsync();

        }

        public async Task<Book> GetBookByIdAsync(int id)
        {
            return await _context.Books.FindAsync(id);
        }
        public async Task<Book> CreateAsync(Book bookToCreate)
        {
            await _context.Books.AddAsync(bookToCreate);
            await _context.SaveChangesAsync();
            return bookToCreate;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return false;

            _context.Books.Remove(book);
            return await _context.SaveChangesAsync() > 0;
        }

      

        public async Task<Book> UpdateAsync(int id, Book bookToUpdate)
        {
            var book = await _context.Books.AsNoTracking().FirstOrDefaultAsync(b => b.Id == id);
            if (book == null) return null;
            bookToUpdate.Id = book.Id;

            _context.Books.Update(bookToUpdate);
            await _context.SaveChangesAsync();
            return bookToUpdate;


        }

        public async Task<Book> GetLatestBookAsync()
        {
            return await _context.Books.IgnoreAutoIncludes().OrderByDescending(b => b.Id).FirstOrDefaultAsync();
        }

        public Task<Book> GetMostSoldBookAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Book> GetMostOrderdBookAsync()
        {
            throw new NotImplementedException();
        }

        public Task<bool> AddToFavorite(string userId, int bookId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RemoveFromoFavorite(string userId, int bookId)
        {
            throw new NotImplementedException();
        }
    }
}
