public class MovementRequest
{
    public int ProductId { get; set; }
    public int Cantidad { get; set; }
    public string Type { get; set; } = default!;
    public string? Note { get; set; }
}
