using System.Threading.Tasks;
using System.Linq;
using Ccl.Api.Models;
using BCrypt.Net;

namespace Ccl.Api.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            // Si no hay usuarios, creamos los iniciales
            if (!context.Users.Any())
            {
                var adminPassword = BCrypt.Net.BCrypt.HashPassword("Admin123*");
                var userPassword = BCrypt.Net.BCrypt.HashPassword("User123*");

                context.Users.AddRange(
                    new User
                    {
                        Username = "admin",
                        PasswordHash = adminPassword,
                        Role = "admin"
                    },
                    new User
                    {
                        Username = "usuario",
                        PasswordHash = userPassword,
                        Role = "user"
                    }
                );

                await context.SaveChangesAsync();
            }
        }
    }
}
