using DressShopBackend.Data.Entities.Identity;
using DressShopBackend.Data;
using DressShopBackend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using DressShopBackend.Models;

namespace DressShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager<AppUser> _userManager;
        private IJwtBearerService _jwtBearer;
        private EFContext _context;

        public UserController(UserManager<AppUser> userManager,
            IJwtBearerService jwtBearer, EFContext context)
        {
            _userManager = userManager;
            _jwtBearer = jwtBearer;
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserModel login)
        {
            IActionResult res = null;
            return await Task.Run(async () =>
            {

                var user = await _userManager.FindByEmailAsync(login.Email);

                if (user == null)
                {
                    res = BadRequest(new
                    {
                        Errors = new
                        {
                            Email = new string[] { "Користувача не існує!" }
                        }
                    });
                    return res;
                }


                try
                {

                    if (!(await _userManager.CheckPasswordAsync(user, login.Password)))
                    {
                        res = BadRequest(new
                        {
                            Errors = new
                            {
                                Password = new string[] { "Пароль не правильний!" }
                            }
                        });
                        return res;
                    }
                }
                catch (Exception ex)
                {

                }

                res = Ok(new
                {
                    token = _jwtBearer.GenerateToken(user)
                });
                return res;
            });
        }
    }
}
