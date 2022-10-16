using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using PortfolioMvc.ViewModels;
using System.Security.Claims;

namespace PortfolioMvc.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel loginViewModel)
        {
            if (!ModelState.IsValid) return View();

            if (loginViewModel.Username != "mohamed" && loginViewModel.Password != "123")
            {
                ModelState.AddModelError("", "Wrong username/password");
                return View();
            }

            ClaimsPrincipal claimPrincipal = SetUpClaims(loginViewModel);

            await HttpContext.SignInAsync(claimPrincipal);

          
            if (!string.IsNullOrEmpty(loginViewModel.ReturnUrl))
            {
                return LocalRedirect(loginViewModel.ReturnUrl);
            }
            return RedirectToAction("Index", "Project");

            //return Redirect(HttpC)
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            // Clear the existing external cookie
            await HttpContext.SignOutAsync(
                CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Project");
        }

        private static ClaimsPrincipal SetUpClaims(LoginViewModel loginViewModel)
        {
            //correct credentials
            var claims = new List<Claim>();
            claims.Add(new Claim("username", loginViewModel.Username));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, loginViewModel.Username));

            // claimIdentity
            var claimIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            // claimPrincipal 
            var claimPrincipal = new ClaimsPrincipal(claimIdentity);
            return claimPrincipal;
        }
    }
}
