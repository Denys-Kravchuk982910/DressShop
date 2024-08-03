using DressShopBackend.Data.Entities.Identity;
using DressShopBackend.Data;
using Microsoft.AspNetCore.Identity;
using System.Data;
using DressShopBackend.Constants;

namespace DressShopBackend.Services
{
    public static class Seeder
    {
        public static void SeedAll(this WebApplication app) 
        {
            using (var scope = app.Services.CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFContext>();

                SeedIdentity(userManager, roleManager, context);
            }
        }

        private static void SeedIdentity(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, EFContext context)
        {
            if (!roleManager.Roles.Any())
            {
                var res = roleManager.CreateAsync(new AppRole
                {
                    Name = Roles.USER
                }).Result;

                res = roleManager.CreateAsync(new AppRole
                {
                    Name = Roles.ADMIN
                }).Result;
            }

            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    UserName = "admin@gmail.com",
                    Email = "admin@gmail.com",
                    FullName = "admin"
                };
                var res = userManager.CreateAsync(user, "hdafQ#$GRVwEF").Result;

                if (res.Succeeded)
                {
                    var result = userManager.AddToRoleAsync(user, Roles.ADMIN).Result;
                }
            }
        }

    }
}
