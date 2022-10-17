using DomainLayer.Interfaces;
using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class BookRepository:IBookRepository
    {
        private readonly BookStoreApiDbContext _context;

        public BookRepository(BookStoreApiDbContext context)
        {
            _context = context;
        }
        public async Task<Book> Add(Book book)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
            return book;
        }

        public async Task<bool> Delete(int id)
        {

            var book = await _context.Books.FindAsync(id);
            if (book == null)
                return false;
            else
            {
                _context.Books.Remove(book);
                await _context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<List<Book>> GetAllBooks()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<Book> GetById(int id)
        {
            var book = await _context.Books.FindAsync(id);
            //if (book == null)
            //    return false;
            return book;
        }

        public async Task<Book> Update(int id, Book bookChanegs)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
                return book;
            else
            {
                book.Title = bookChanegs.Title;
                await _context.SaveChangesAsync();
                return book;
            }
        }
    }
}

