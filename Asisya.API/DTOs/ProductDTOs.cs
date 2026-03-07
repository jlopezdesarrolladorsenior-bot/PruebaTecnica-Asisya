namespace Asisya.API.DTOs
{
    // Para mostrar en el listado y detalle
    public class ProductResponseDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string CategoryName { get; set; } = string.Empty; // Mapeo explícito 
        public decimal UnitPrice { get; set; }
        public short UnitsInStock { get; set; }
        public string? CategoryPicture { get; set; } // Requerimiento: detalle con foto 
    }

    // Para recibir datos en el POST/PUT
    public class ProductCreateDTO
    {
        public string ProductName { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public decimal UnitPrice { get; set; }
        public short UnitsInStock { get; set; }
    }
}