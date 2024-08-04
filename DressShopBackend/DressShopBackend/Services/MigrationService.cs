using DressShopBackend.Data;
using Microsoft.EntityFrameworkCore;

namespace DressShopBackend.Services
{
    public static class MigrationService
    {
        public static void MigrateToDatabase(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                scope.ServiceProvider.GetService<EFContext>().Database.Migrate();
            }
        }
    }
}
