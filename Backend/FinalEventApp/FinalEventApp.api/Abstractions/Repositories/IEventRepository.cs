﻿using FinalEventApp.api.Models;

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

        Task<EventMember> JoinEvent(int eventId, string memberId);
        Task<bool> ExitEvent(int eventId, string memberId);

        Task<List<AppUser>> GetEventMembers(int eventId);
        Task<List<Event>> GetUserJoinedEvents(string userId);
        Task<List<Event>> GetUserCreatedEvents(string userId);
    }
}
