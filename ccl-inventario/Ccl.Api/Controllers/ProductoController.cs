using System.Security.Claims;
using Ccl.Api.Data;
using Ccl.Api.Dtos;
using Ccl.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ccl.Api.Controllers;

[ApiController]
[Route("api/productos")]
[Authorize] // Requiere token para acceder
public class ProductoController : ControllerBase
{
    private readonly AppDbContext _db;

    // Constructor: inyectamos el contexto de la base de datos
    public ProductoController(AppDbContext db)
    {
        _db = db; // Asignamos el contexto a la variable privada
    }

    [HttpGet("inventario")]
    // GET: api/productos/inventario
    // Devuelve la lista de productos activos en el inventario
    public async Task<ActionResult> GetInventario()
    {
        var lista = await _db.Productos
            .Where(p => p.Active) // Solo traemos productos activos
            .Select(p => new ProductDto
            {
                Id = p.Id,           // Identificador único del producto
                Sku = p.Sku,         // Código SKU del producto
                Name = p.Name,       // Nombre del producto
                Stock = p.Stock,     // Cantidad disponible en inventario
                MinStock = p.MinStock, // Stock mínimo recomendado
                Active = p.Active    // Estado activo/inactivo del producto
            })
            .ToListAsync();

        return Ok(lista);
    }

    [HttpPost("movimiento")]
    // POST: api/productos/movimiento
    // Registra un movimiento de inventario (entrada o salida)
    public async Task<ActionResult> RegistrarMovimiento([FromBody] MovementRequest request)
    {
        // Validamos que el tipo de movimiento sea válido
        if (request.Type != "IN" && request.Type != "OUT")
            return BadRequest("El tipo de movimiento debe ser 'IN' o 'OUT'");

        // Validamos que la cantidad sea mayor a cero
        if (request.Cantidad <= 0)
            return BadRequest("La cantidad debe ser mayor a cero");

        // Buscamos el producto en la base de datos
        var producto = await _db.Productos.FindAsync(request.ProductId);
        if (producto == null || !producto.Active)
            return NotFound("Producto no encontrado o inactivo");

        // Calculamos el nuevo stock
        var nuevoStock = request.Type == "IN"
            ? producto.Stock + request.Cantidad
            : producto.Stock - request.Cantidad;

        // Validamos que no quede stock negativo
        if (nuevoStock < 0)
            return BadRequest("Stock insuficiente para esta salida");

        // Actualizamos el stock
        producto.Stock = nuevoStock;

        // Obtenemos el Id del usuario desde el token JWT
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userId = userIdClaim != null ? int.Parse(userIdClaim) : 0;

        // Creamos el registro del movimiento
        var movimiento = new Movement
        {
            ProductId = producto.Id,      // Producto afectado
            Quantity = request.Cantidad,  // Cantidad del movimiento
            Type = request.Type,          // Tipo de movimiento ("IN" o "OUT")
            Timestamp = DateTime.UtcNow,  // Fecha y hora en UTC
            UserId = userId,              // Usuario que realiza el movimiento
            Note = request.Note           // Nota opcional
        };

        // Guardamos el movimiento en la base de datos
        _db.Movements.Add(movimiento);
        await _db.SaveChangesAsync();

        // Respondemos con los datos actualizados del producto y del movimiento
        return Ok(new
        {
            producto.Id,
            producto.Sku,
            producto.Name,
            producto.Stock,
            producto.MinStock,
            producto.Active,
            movimiento.Type,
            movimiento.Quantity,
            movimiento.Timestamp,
            movimiento.Note
        });
    }
}
