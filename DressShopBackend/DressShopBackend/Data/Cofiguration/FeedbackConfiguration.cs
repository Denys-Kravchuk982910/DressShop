using DressShopBackend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DressShopBackend.Data.Cofiguration
{
    public class FeedbackConfiguration : IEntityTypeConfiguration<AppFeedback>
    {
        public void Configure(EntityTypeBuilder<AppFeedback> builder)
        {
            builder.ToTable("tblFeedback");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Text).IsRequired().HasMaxLength(255);
            builder.Property(x => x.AuthorImage).IsRequired().HasMaxLength(255);
            builder.Property(x => x.AuthorName).IsRequired().HasMaxLength(255);

            builder.HasOne(x => x.Product)
                .WithMany(x => x.Feedbacks)
                .HasForeignKey(x => x.ProductId)
                .IsRequired();
        }
    }
}
