﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventWebApp.Domain.Models
{
    public class EventTag
    {

        public int EventId { get; set; }
        public Event Event { get; set; }
        public int TagId { get; set; }
        public Tag Tag { get; set; }

       
    }
}
