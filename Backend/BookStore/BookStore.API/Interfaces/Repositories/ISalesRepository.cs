using BookStore.API.Models;

namespace BookStore.API.Interfaces.Repositories
{
    public interface ISalesRepository
    {
        Task<Sales> AddBookSale(Sales bookSale);
        Task<Book> GetMostSoldBookAsync();
        Task<Book> GetMostOrderdBookAsync();

        Task<List<Sales>> GetUserSales(string userId);
        Task<List<Sales>> GetBookSales(int bookId);
        Task<List<Sales>> GetAllSales();

        Task<Sales> UpdateStatus(int saleId,int status);





    }
}
