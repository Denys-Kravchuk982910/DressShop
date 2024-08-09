using DressShopBackend.Data.Entities.Identity;
using DressShopBackend.Data;
using DressShopBackend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using DressShopBackend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using DressShopBackend.Constants;

namespace DressShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager<AppUser> _userManager;
        private IJwtBearerService _jwtBearer;
        private EFContext _context;
        private IConfiguration _configuration;

        public UserController(UserManager<AppUser> userManager,
            IJwtBearerService jwtBearer, EFContext context, IConfiguration configuration)
        {
            _userManager = userManager;
            _jwtBearer = jwtBearer;
            _context = context;
            _configuration = configuration;
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

        [HttpPost]
        [Route("validate")]
        public IActionResult ValidateToken([FromBody] ValidateUserModel token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var prKey = _configuration.GetValue<string>("private_key");

            if (prKey == null)
            {
                return BadRequest(new { Message = "Зверніться до розробників!", });
            }

            var key = Encoding.ASCII.GetBytes(prKey);

            try
            {
                var principal = tokenHandler.ValidateToken(token.Token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

               

                if (principal.HasClaim(c => c.Type.EndsWith("role") && c.Value == Roles.ADMIN))
                {
                    return Ok(new { Message = "Token is valid", IsValid = true });
                }
                else
                {
                    return Unauthorized(new { Message = "Token does not have the required claims.", IsValid = false });
                }
            }
            catch (SecurityTokenException ex)
            {
                return Unauthorized(new { Message = "Token validation failed", IsValid = false });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "An error occurred while validating the token", Error = ex.Message });
            }
        }
    }
}
