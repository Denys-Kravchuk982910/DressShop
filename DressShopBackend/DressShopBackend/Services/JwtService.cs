using DressShopBackend.Data.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DressShopBackend.Services
{
    public interface IJwtBearerService
    {
        public string GenerateToken(AppUser user);
    }

    public class JwtBearerService : IJwtBearerService
    {
        private UserManager<AppUser> _userManager;
        private IConfiguration _configuration;
        public JwtBearerService(UserManager<AppUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }
        public string GenerateToken(AppUser user)
        {
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim("email", user.FullName));
            claims.Add(new Claim("username", user.UserName));
            claims.Add(new Claim("id", user.Id.ToString()));

            var roles = _userManager.GetRolesAsync(user).Result;
            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }

            SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetValue<String>("private_key")
                ));

            SigningCredentials credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken jwt = new JwtSecurityToken(claims: claims, signingCredentials: credentials, expires: DateTime.Now.AddDays(10));

            string token = new JwtSecurityTokenHandler().WriteToken(jwt);
            return token;
        }
    }
}
