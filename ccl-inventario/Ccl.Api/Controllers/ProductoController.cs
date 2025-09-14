using Ccl.Api.Data;
using Ccl.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ccl.Api.Controllers;

[ApiController]
[Route("api/productos")]
[Authorize] //Requiere token para acceder
public class ProductoController : ControllerBase
{
    private readonly AppDbContext _db;
    // Inyectamos el contexto de la base de datos
    // para acceder a la tabla de productos
    public ProductoController(AppDbContext db)
    {

        _db = db;
    }

    [HttpGet("inventario")]
    // GET: api/productos/inventario
    // Devuelve la lista de productos con stock > 0
    // Cualquier usuario autenticado puede acceder

    public async Task<ActionResult> GetInventario()
    {
        var lista = await _db.Productos
        .Where(p => p.Active) // Traemos únicamente los productos que están activos
        .Select(p => new
        {
            p.Id,       // Identificador único del producto en la base de datos
            p.Sku,      // Código SKU que sirve como referencia interna de inventario
            p.Name,     // Nombre del producto tal como se muestra a los usuarios
            p.Stock,    // Cantidad actual disponible en inventario
            p.MinStock, // Nivel mínimo de stock recomendado para control de inventario
            p.Active    // Indica si el producto está activo (true) o inactivo (false)
        })
        .ToListAsync();

        return Ok(lista);
    }
    [HttpPost("movimiento")]
    public asyn
}