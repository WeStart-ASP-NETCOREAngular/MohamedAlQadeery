using DomainLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAllBooks();
        Task<Book> GetById(int id);
        Task<Book> Add(Book book);
        Task<Book> Update(int id, Book bookChanegs);
        Task<bool> Delete(int id);
    }
}
