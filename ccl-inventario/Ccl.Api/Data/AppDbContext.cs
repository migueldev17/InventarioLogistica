using System.Linq;
using System.Threading.Tasks;
using Ccl.Api.Models;

namespace Ccl.Api.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            // SI NO EXISTEN USUARIOS, CREAR LOS INICIALES
            if (!context.Users.Any())
            {
                // SE ENCRIPTA LA CONTRASEÑA CON BCRYPT
                var adminPassword = BCrypt.Net.BCrypt.HashPassword("Admin123*");
                var userPassword = BCrypt.Net.BCrypt.HashPassword("User123*");

                context.Users.AddRange(
                    new User
                    {
                        Username = "admin",
                        PasswordHash = adminPassword,
                        Role = "Admin"  // EL ROL VA EN MAYÚSCULA PARA USARLO EN [Authorize(Roles = "Admin")]
                    },
                    new User
                    {
                        Username = "usuario",
                        PasswordHash = userPassword,
                        Role = "Users" // ROL POR DEFECTO PARA USUARIO NORMAL
                    }
                );

                await context.SaveChangesAsync();
            }

            // OPCIONAL: SI NO EXISTEN PRODUCTOS, CREAR LOS INICIALES
            if (!context.Productos.Any())
            {
                context.Productos.AddRange(
                    new Product
                    {
                        Sku = "TEC001",
                        Name = "Teclado",
                        Stock = 10,
                        MinStock = 5,
                        Active = true
                    },
                    new Product
                    {
                        Sku = "MOU001",
                        Name = "Mouse",
                        Stock = 20,
                        MinStock = 10,
                        Active = true
                    }
                );

                await context.SaveChangesAsync();
            }
        }
    }
}
