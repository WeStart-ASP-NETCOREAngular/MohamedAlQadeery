using FinalEventApp.api.Abstractions.Repositories;
using FinalEventApp.api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinalEventApp.api.Data.Repositories
{
    public class EventRepository : IEventRepository
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
            return await _context.Events.Include(t => t.Tags).FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Event> CreateAsync(Event newEvent)
        {

            // newEvent.Tags.ForEach(t => t.EventId = newEvent.Id);
            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();

            return newEvent;
        }

        public async Task<Event> UpdateAsync(int id, Event eventToUpdate)
        {
            var eventExist = await _context.Events.Include(e => e.Tags).FirstOrDefaultAsync(e => e.Id == id);
            if (eventExist == null) return null;

            //updating event data
            eventExist.Name = eventToUpdate.Name;
            eventExist.CategoryId = eventToUpdate.CategoryId;
            eventExist.Tags = eventToUpdate.Tags;


            //gets existing so we can remove the tags dont exist in the list
            var exisitingTags = await _context.EventTags.Where(et => et.EventId == eventExist.Id).ToListAsync();

            exisitingTags.ForEach(t =>
            {
              if (!eventExist.Tags.Any(updateTag => updateTag.TagId == t.TagId))
                {
                    //we should deatch it so ef will stop tracking it
                    _context.Entry(t).State = EntityState.Detached;

                    //does not exist in updated list so we should remove it
                    _context.EventTags.Remove(t);
                }
            });

            _context.Events.Update(eventExist);
            await _context.SaveChangesAsync();
            return eventExist;

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

        public async Task AssignTagsToEventAsync(int id, List<EventTag> tags)
        {
            var eventExist = await _context.Events.FindAsync(id);
            if (eventExist == null) return;

            tags.ForEach(t => _context.EventTags.Add(t));
            await _context.SaveChangesAsync();

        }

        public async Task<EventMember> JoinEvent(int eventId,string memberId)
        {
            var eventExist = await _context.Events.FindAsync(eventId);
            if(eventExist == null) { return null; } 
            var memberExist = await _context.Users.FindAsync(memberId);
            if(memberExist == null) { return null; }

            var eventMember = new EventMember { EventId = eventId, MemberId = memberId };
            await _context.EventMembers.AddAsync(eventMember);
            await _context.SaveChangesAsync();
            return eventMember;
        }

        public async Task<bool> ExitEvent(int eventId,string memberId)
        {
            var eventExist = await _context.Events.FindAsync(eventId);
            if (eventExist == null) { return false; }
            var memberExist = await _context.Users.FindAsync(memberId);
            if (memberExist == null) { return false; }

            var eventMemberExist = await _context.EventMembers.
                Where(em => em.EventId == eventId && em.MemberId == memberId)
                .SingleOrDefaultAsync();

            if(eventMemberExist == null) { return false; }

          
             _context.EventMembers.Remove(eventMemberExist);
          return await _context.SaveChangesAsync() >0;
           
        }

        public async Task<List<EventMember>> GetEventMembers(int eventId)
        {
            var eventExist = await _context.Events.Include(e=>e.Members).FirstOrDefaultAsync(e=>e.Id == eventId);

            if(eventExist == null) { return null; }

            return eventExist.Members.ToList();
        }
    }
}
