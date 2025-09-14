namespace Ccl.Api.Dtos;

public class MovementDto
{
    public int Id { get; set; }
    public string Producto { get; set; } = default!;
    public string Usuario { get; set; } = default!;
    public int Quantity { get; set; }
    public string Type { get; set; } = default!; // "IN" o "OUT"
    public DateTime Timestamp { get; set; }
    public string? Note { get; set; }
}
