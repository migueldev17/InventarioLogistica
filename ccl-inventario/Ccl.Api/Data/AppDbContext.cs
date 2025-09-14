using Microsoft.EntityFrameworkCore;
using Ccl.Api.Models;

namespace Ccl.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) // 🔹 Importante: llamar a la base
        {
        }

        // 🔹 generará la tabla "Users"
        public DbSet<User> Users { get; set; } = default!;
    }
}
