namespace Asisya.API.DTOs
{
    public class CategoryRequestDTO
    {
        public string CategoryName { get; set; } = string.Empty; // Ej: "SERVIDORES" 
        public string Description { get; set; } = string.Empty;
        public string? Picture { get; set; } 
    }
}