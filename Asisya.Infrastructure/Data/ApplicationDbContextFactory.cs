using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Asisya.Infrastructure.Data
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            // Usamos la misma cadena que tienes en Docker
            optionsBuilder.UseNpgsql("Host=localhost;Database=asisya_db;Username=admin;Password=asisya_pass;Port=5432");

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}