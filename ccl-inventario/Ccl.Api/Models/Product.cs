namespace Ccl.Api.Models;

public class Product
{
    public int Id { get; set; }
    public string Sku { get; set; } = default!;
    public string Name { get; set; } = default!;
    public int Stock { get; set; } = 0;
    public int? MinStock { get; set; }
    public bool Active { get; set; } = true;
}
