﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventWebApp.Contracts.DTOs.Category
{
    public class UpdateCategoryDto
    {
        [Required]
        [MinLength(3)]
        public string Name { get; set; }
    }
}
