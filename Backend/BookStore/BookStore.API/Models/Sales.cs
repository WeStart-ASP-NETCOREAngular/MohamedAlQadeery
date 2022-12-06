﻿using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.API.Models
{
    public class Sales
    {
        public int Id { get; set; }
        [ForeignKey("AppUser")]
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }


        [ForeignKey("Book")]
        public int BookId { get; set; }
        public Book Book { get; set; }

        public int Amount { get; set; }
        public DateTime OrderDate { get; set; }

        public int TotalPrice { get; set; }
    }
}
