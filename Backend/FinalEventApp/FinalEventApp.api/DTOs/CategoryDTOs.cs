﻿using System.ComponentModel.DataAnnotations;

namespace FinalEventApp.api.DTOs
{
    public class CreateCategoryDto
    {
        [Required]
        public string Name { get; set; }
    }


    public class UpdateCategoryDto
    {
        [Required]
        public string Name { get; set; }
    }

    public class CategoryResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
