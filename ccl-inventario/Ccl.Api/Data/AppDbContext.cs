using Microsoft.EntityFrameworkCore;
using Ccl.Api.Models;

namespace Ccl.Api.Data
{
    public class AppDbContext : DbContext
    {
        // Constructor que recibe opciones de configuración
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) // Llama al constructor base de DbContext
        {
        }

        //  Tablas gestionadas por EF Core
        public DbSet<User> Users { get; set; } = default!;
        public DbSet<Product> Productos { get; set; } = default!;
        public DbSet<Movement> Movements { get; set; } = default!;

        // Configuraciones adicionales
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuraciones de las entidades
            base.OnModelCreating(modelBuilder);

            // Configuraciones adicionales si es necesario
            modelBuilder.Entity<User>().ToTable("Usuarios"); // _db.Users -> tabla "Usuarios"
            modelBuilder.Entity<Product>().ToTable("Productos");// _db.Products -> tabla "Productos"
            modelBuilder.Entity<Movement>().ToTable("Movimientos");// _db.Movements -> tabla "Movimientos"
            // Datos iniciales de ejemplo
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Sku = "TEC001", Name = "Teclado", Stock = 10, MinStock = 5, Active = true },// Datos iniciales de ejemplo
                new Product { Id = 2, Sku = "MOU001", Name = "Mouse", Stock = 20, MinStock = 10, Active = true }// Datos iniciales de ejemplo
            );
        }
    }
}
