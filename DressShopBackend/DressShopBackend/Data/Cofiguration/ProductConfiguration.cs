using DressShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DressShopBackend.Data.Cofiguration
{
    public class ProductConfiguration : IEntityTypeConfiguration<AppProduct>
    {
        public void Configure(EntityTypeBuilder<AppProduct> builder)
        {
            builder.ToTable("tblProduct");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Title).IsRequired().HasMaxLength(255);
            builder.Property(x => x.Tag).IsRequired().HasMaxLength(25);
            builder.Property(x => x.Description).IsRequired().HasMaxLength(255);
            builder.Property(x => x.Price).IsRequired();
            builder.Property(x => x.Rate).IsRequired();
        }
    }
}
