using API.Entities;
using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Context;

public class WineUserDetailsConfiguration : IEntityTypeConfiguration<WineUserDetails>
{
    public void Configure(EntityTypeBuilder<WineUserDetails> entity)
    {
        entity.Property(u => u.Favorite).IsNotNull();
        entity.Property(u => u.Quantity).IsRequired().IsNotNull();
        entity.Property(u => u.UserNote).HasMaxLength(500);
        entity.Property(u => u.PurchaseLocation).HasMaxLength(70);
    }
}