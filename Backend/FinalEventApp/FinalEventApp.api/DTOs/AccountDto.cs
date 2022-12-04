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
        public string UserName { get; set; }

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
        public string Token { get; set; }

        public string Role { get; set; }
        public string Username { get; set; }
    }


    public class LoginUserDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }


    public class loginResponseDto
    {
        public int loginStatus { get; set; }
        public string Error { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
        public string Username { get; set; }
    }
}
