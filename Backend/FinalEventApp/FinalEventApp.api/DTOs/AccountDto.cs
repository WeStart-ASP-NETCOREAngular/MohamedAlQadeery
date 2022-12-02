using System.ComponentModel.DataAnnotations;

namespace FinalEventApp.api.DTOs
{
   public class RegisterUserDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }


    public class RegisterResponseDto
    {
        public int RegisterationStatus { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}
