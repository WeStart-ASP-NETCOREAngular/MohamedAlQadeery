using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventWebApp.Domain.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime DeletedAt { get; set; }
       
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public List<EventTag> EventTags { get; set; }

        public List<EventUser> EventUsers { get; set; }

    }
}
