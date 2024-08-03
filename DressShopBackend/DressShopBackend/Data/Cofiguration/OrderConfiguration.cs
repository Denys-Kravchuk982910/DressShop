using DressShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DressShopBackend.Data.Cofiguration
{
    public class OrderConfiguration : IEntityTypeConfiguration<AppOrder>
    {
        public void Configure(EntityTypeBuilder<AppOrder> builder)
        {
            builder.ToTable("tblOrder");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).HasMaxLength(255).IsRequired();
            builder.Property(x => x.Surname).HasMaxLength(255).IsRequired();
            builder.Property(x => x.Email).HasMaxLength(255).IsRequired();
            builder.Property(x => x.Phone).HasMaxLength(255).IsRequired();
            builder.Property(x => x.Deliver).HasMaxLength(255).IsRequired();
            builder.Property(x => x.Status).HasMaxLength(255).HasDefaultValue("active");
        }
    }
}
