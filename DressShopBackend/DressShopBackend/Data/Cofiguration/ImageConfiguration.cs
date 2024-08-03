using DressShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DressShopBackend.Data.Cofiguration
{
    public class ImageConfiguration : IEntityTypeConfiguration<AppImage>
    {
        public void Configure(EntityTypeBuilder<AppImage> builder)
        {
            builder.ToTable("tblImage");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Image).IsRequired().HasMaxLength(255);

            builder.HasOne(x => x.Product)
                .WithMany(x => x.Images)
                .HasForeignKey(x => x.ProductId)
                .IsRequired();
        }
    }
}
