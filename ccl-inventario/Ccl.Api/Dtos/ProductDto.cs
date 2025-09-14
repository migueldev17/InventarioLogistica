namespace Ccl.Api.Dtos;

public class ProductDto
{
    public int Id { get; set; }
    public string Sku { get; set; } = default!;
    public string Name { get; set; } = default!;
    public int Stock { get; set; }
    public int? MinStock { get; set; }
    public bool Active { get; set; }
}
