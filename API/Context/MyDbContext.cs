using Microsoft.EntityFrameworkCore;
using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace API.Context;

public class MyDbContext : IdentityDbContext<User, Role, int>
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
    {
    }

    public virtual DbSet<Wine> Wines { get; set; } = null!;
    public virtual DbSet<WishItem> Wishlist { get; set; } = null!;
    public virtual DbSet<Consumed> Consumed { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // add customizations after calling base...
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new WineConfiguration());
        modelBuilder.ApplyConfiguration(new WineUserDetailsConfiguration());

        modelBuilder.Entity<Role>()
            .HasData(
                new Role {Id = 1, Name = "Member", NormalizedName = "MEMBER"},
                new Role {Id = 2, Name = "Admin", NormalizedName = "ADMIN"}
            );
    }
}