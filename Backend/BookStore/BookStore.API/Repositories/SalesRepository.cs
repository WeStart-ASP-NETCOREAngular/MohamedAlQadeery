using BookStore.API.Data;
using BookStore.API.Interfaces.Repositories;
using BookStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Repositories
{
    public class SalesRepository : ISalesRepository
    {
        private readonly BookStoreDbContext _context;

        public SalesRepository(BookStoreDbContext context)
        {
            _context = context;
        }
        public async Task<Sales> AddBookSale(Sales bookSale)
        {
            //validate ids
            var user = await _context.Users.FindAsync(bookSale.AppUserId);
            if (user == null) return null;

            var book = await _context.Books.FindAsync(bookSale.BookId);
            if (book == null) return null;


            _context.Sales.Add(bookSale);
            var isAdded = await _context.SaveChangesAsync() > 0;

            if (!isAdded) return null;


            return bookSale;
        }

        public async Task<Book> GetMostOrderdBookAsync()
        {
            var sales = await _context.Sales.ToListAsync();

            var maxOrderdBookId = sales.GroupBy(s => s.BookId).Select(g => new { bookId = g.Key, totalAmount = g.Sum(s => s.Amount) })
                .MaxBy(s => s.totalAmount);

            return await _context.Books.FirstOrDefaultAsync(b=>b.Id == maxOrderdBookId.bookId);


        }

        public Task<Book> GetMostSoldBookAsync()
        {
            throw new NotImplementedException();
        }

        public Task<List<Sales>> GetUserSales()
        {
            throw new NotImplementedException();
        }
    }
}
