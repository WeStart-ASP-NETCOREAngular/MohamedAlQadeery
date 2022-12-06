﻿using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.API.Models
{
    public class Book
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public decimal Price { get; set; }

        public int Discount { get; set; }
        public string Image { get; set; }
        public string About { get; set; }

        public int PublishYear { get; set; }
        public int PageCount { get; set; }

        [ForeignKey("Author")]
        public int AuthorId { get; set; }
        public virtual  Author Author { get; set; }

        [ForeignKey("Translator")]

        public int TranslatorId { get; set; }
        public virtual Translator Translator { get; set; }


        [ForeignKey("Publisher")]

        public int PublisherId { get; set; }
        public virtual Publisher Publisher { get; set; }

        [ForeignKey("Category")]

        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }


    }
}
