using API.Entities;
using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Context;

public class WineConfiguration : IEntityTypeConfiguration<Wine>
{
    public void Configure(EntityTypeBuilder<Wine> entity)
    {
        // a wine has one userDetail
        entity.HasOne(w => w.UserDetailses)
            .WithOne(i => i.Wine)
            .HasForeignKey<WineUserDetails>(w => w.Id)
            .OnDelete(DeleteBehavior.Cascade);

        // REQUIRED
        entity.Property(w => w.Name)
            .IsRequired()
            .HasMaxLength(120)
            .IsNotNull();

        entity.Property(w => w.Type)
            .IsRequired()
            .HasMaxLength(20)
            .IsNotNull();

        // Date
        entity.Property(w => w.CreatedAt)
            .HasDefaultValueSql("now() at time zone 'utc'");

        // TEXT
        entity.Property(w => w.ProductId)
            .HasMaxLength(24);
        entity.Property(w => w.Country)
            .HasMaxLength(56);
        entity.Property(w => w.Region)
            .HasMaxLength(70);
        entity.Property(w => w.SubRegion)
            .HasMaxLength(70);
        entity.Property(w => w.ManufacturerName)
            .HasMaxLength(70);
        entity.Property(w => w.StoragePotential)
            .HasMaxLength(100);
        entity.Property(w => w.Grapes)
            .HasMaxLength(500);
        entity.Property(w => w.Colour)
            .HasMaxLength(500);
        entity.Property(w => w.Odour)
            .HasMaxLength(500);
        entity.Property(w => w.Taste)
            .HasMaxLength(500);

        // taste values
        entity.Property(w => w.Tannins)
            .HasDefaultValue(0).IsNotNull();
        entity.Property(w => w.Sweetness)
            .HasDefaultValue(0).IsNotNull();
        entity.Property(w => w.Fullness)
            .HasDefaultValue(0).IsNotNull();
        entity.Property(w => w.Freshness)
            .HasDefaultValue(0).IsNotNull();
        entity.Property(w => w.Bitterness)
            .HasDefaultValue(0).IsNotNull();
    }
}