using Ccl.Api.Data;
using Ccl.Api.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ccl.Api.Controllers;
[ApiController]
[Route("api/movements")]
[Authorize(Roles = "Admin")] // Solo los usuarios con rol Admin tienen acceso

public class MovementsController : ControllerBase
{
    private readonly AppDbContext _db;
    public MovementsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    // GET: api/movements
    // Devuelve la lista de todos los movimientos de inventario
    public async Task<ActionResult<IEnumerable<MovementDto>>> GetAllMovements()
    {
        var movimientos = await _db.Movements
            .Include(m => m.Product) // Incluimos los detalles del producto relacionado
            .Include(m => m.User)    // Incluimos los detalles del usuario que realizó el movimiento
            .OrderByDescending(m => m.Timestamp) // Ordenamos por fecha, el más reciente primero
            .Select(m => new MovementDto
            {
                Id = m.Id,
                Producto = m.Product.Name,
                Usuario = m.User.Username,
                Quantity = m.Quantity,
                Type = m.Type,
                Timestamp = m.Timestamp,
                Note = m.Note
            })
            .ToListAsync();

        return Ok(movimientos);
    }
}