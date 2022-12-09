using FinalEventApp.api.Models;

namespace FinalEventApp.api.Abstractions.Repositories
{
    public interface IEventRepository
    {
        Task<List<Event>> GetAllEventsAsync();
        Task<Event> GetEventByIdAsync(int id);
        Task<Event> CreateAsync(Event newEvent);
        Task<Event> UpdateAsync(int id, Event eventToUpdate);
        Task<bool> DeleteAsync(int id);

        Task AssignTagsToEventAsync(int id, List<EventTag> tags);
    }
}
