using FinalEventApp.api.Abstractions.Repositories;
using FinalEventApp.api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinalEventApp.api.Data.Repositories
{
    public class EventRepository :IEventRepository
    {
        private readonly EventAppDbContext _context;

        public EventRepository(EventAppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Event>> GetAllEventsAsync()
        {
            return await _context.Events.ToListAsync();
        }

        public async Task<Event> GetEventByIdAsync(int id)
        {
            return await _context.Events.FindAsync(id);
        }

        public async Task<Event> CreateAsync(Event newEvent)
        {
            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();
            return newEvent;
        }

        public async Task<Event> UpdateAsync(int id,Event eventToUpdate)
        {
            var eventExist = await _context.Events.FindAsync(id);
            eventToUpdate.Id = eventExist.Id;
            if (eventExist != null)
            {
                _context.Events.Update(eventToUpdate);
                await _context.SaveChangesAsync();
                return eventToUpdate;

            }

            return null;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var eventExist = await _context.Events.FindAsync(id);
            if (eventExist != null)
            {
                var eventToDelete = await _context.Events.FindAsync(id);
                _context.Events.Remove(eventToDelete);
               return await _context.SaveChangesAsync() > 0;
            }

            return false;
        }

       
    }
}
