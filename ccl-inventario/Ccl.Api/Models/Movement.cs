namespace Ccl.Api.Models;

public class Movement
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; } = default!;
    public int Quantity { get; set; }
    public string Type { get; set; } = default!; // "IN" o "OUT"
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public int UserId { get; set; }
    public User User { get; set; } = default!;
    public string? Note { get; set; }
}
