using BookStore.API.Models;

namespace BookStore.API.Interfaces.Repositories
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAllBooksAsync();
        Task<Book> GetBookByIdAsync(int id);
        Task<Book> CreateAsync(Book bookToCreate);
        Task<Book> UpdateAsync(int id, Book bookToUpdate);
        Task<bool> DeleteAsync(int id);
    }
}
