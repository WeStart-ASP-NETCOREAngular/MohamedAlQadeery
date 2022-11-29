using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventWebApp.Contracts.DTOs.Tag
{
    public class UpdateTagDto
    {
        [Required]

        public string Name { get; set; }
    }
}
