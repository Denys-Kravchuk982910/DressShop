using DressShopBackend.Data.Cofiguration;
using DressShopBackend.Data.Cofiguration.Identity;
using DressShopBackend.Data.Entities;
using DressShopBackend.Data.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DressShopBackend.Data
{
    public class EFContext : IdentityDbContext<AppUser, AppRole, long, 
        IdentityUserClaim<long>, AppUserRole, IdentityUserLogin<long>, 
        IdentityRoleClaim<long>, IdentityUserToken<long>>
    {
        public DbSet<AppUser> Users { get; set; }
        public DbSet<AppRole> Roles { get; set; }
        public DbSet<AppUserRole> UserRoles { get; set; }

        public DbSet<AppFeedback> Feedbacks { get; set; }
        public DbSet<AppImage> Images { get; set; }
        public DbSet<AppSize> Sizes { get; set; }
        public DbSet<AppSizeProduct> SizeProducts { get; set; }
        public DbSet<AppProduct> Products { get; set; }
        public DbSet<AppFilter> Filters { get; set; }
        public DbSet<AppFilterProduct> FilterProducts { get; set; }
        public DbSet<AppOrder> Orders { get; set; }
        public DbSet<AppOrderProduct> OrderProducts { get; set; }

        public EFContext(DbContextOptions opts) : base(opts)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new IdentityConfiguration());
            builder.ApplyConfiguration(new FeedbackConfiguration());
            builder.ApplyConfiguration(new ImageConfiguration());
            builder.ApplyConfiguration(new SizeConfiguration());
            builder.ApplyConfiguration(new SizeProductConfiguration());
            builder.ApplyConfiguration(new FilterConfiguration());
            builder.ApplyConfiguration(new FilterProductConfiguration());
            builder.ApplyConfiguration(new OrderProductConfiguration());
            builder.ApplyConfiguration(new OrderConfiguration());
        }
    }
}
