namespace Asisya.API.DTOs
{
    
    public class ProductResponseDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string CategoryName { get; set; } = string.Empty; 
        public decimal UnitPrice { get; set; }
        public short UnitsInStock { get; set; }
        public string? CategoryPicture { get; set; } 
    }
    
    public class ProductCreateDTO
    {
        public string ProductName { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public decimal UnitPrice { get; set; }
        public short UnitsInStock { get; set; }
    }
}