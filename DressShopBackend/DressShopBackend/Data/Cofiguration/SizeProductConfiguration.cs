using DressShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DressShopBackend.Data.Cofiguration
{
    public class SizeProductConfiguration : IEntityTypeConfiguration<AppSizeProduct>
    {
        public void Configure(EntityTypeBuilder<AppSizeProduct> builder)
        {
            builder.ToTable("tblSizeProduct");
            builder.HasKey(x => new { x.ProductId, x.SizeId });

            builder.HasOne(x => x.Product)
                .WithMany(x => x.SizeProducts)
                .HasForeignKey(x => x.ProductId)
                .IsRequired();

            builder.HasOne(x => x.Size)
                .WithMany(x => x.SizeProducts)
                .HasForeignKey(x => x.SizeId)
                .IsRequired();
        }
    }
}
