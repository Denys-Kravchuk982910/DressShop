using DressShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DressShopBackend.Data.Cofiguration
{
    public class SizeConfiguration : IEntityTypeConfiguration<AppSize>
    {
        public void Configure(EntityTypeBuilder<AppSize> builder)
        {
            builder.ToTable("tblSize");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Size).IsRequired().HasMaxLength(10);
        }
    }
}
