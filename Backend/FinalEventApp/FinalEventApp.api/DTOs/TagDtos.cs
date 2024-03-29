﻿using System.ComponentModel.DataAnnotations;

namespace FinalEventApp.api.DTOs
{
    public class CreateTagDto
    {
        [Required]
        public string Name { get; set; }
    }


    public class UpdateTagDto
    {
        [Required]
        public string Name { get; set; }
    }

    public class TagResponseDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
