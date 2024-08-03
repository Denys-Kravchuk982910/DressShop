using DressShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DressShopBackend.Data.Cofiguration
{
    public class OrderProductConfiguration : IEntityTypeConfiguration<AppOrderProduct>
    {
        public void Configure(EntityTypeBuilder<AppOrderProduct> builder)
        {
            builder.ToTable("tblOrderProduct");

            builder.HasKey(x => new { x.OrderId, x.ProductId, x.Size });

            builder.HasOne(x => x.Product)
                .WithMany(x => x.OrderProducts)
                .HasForeignKey(x => x.ProductId)
                .IsRequired();
            
            builder.HasOne(x => x.Order)
                .WithMany(x => x.OrderProducts)
                .HasForeignKey(x => x.OrderId)
                .IsRequired();
        }
    }
}
