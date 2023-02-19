using Microsoft.EntityFrameworkCore;

public class ApplicationContext:DbContext
{
    public DbSet<User> Users { get; set; } = null!;
    public ApplicationContext(DbContextOptions<ApplicationContext> options):base(options)
    {
        
        Database.EnsureCreated();
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasIndex(u=> new { u.Email,u.Password })
            .IsUnique();
        
    }
}