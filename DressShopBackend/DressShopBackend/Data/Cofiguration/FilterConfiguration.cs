using DressShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DressShopBackend.Data.Cofiguration
{
    public class FilterConfiguration : IEntityTypeConfiguration<AppFilter>
    {
        public void Configure(EntityTypeBuilder<AppFilter> builder)
        {
            builder.ToTable("tblFilter");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Title).IsRequired().HasMaxLength(255);
            builder.Property(x => x.Category).IsRequired().HasMaxLength(255);
        }
    }
}
