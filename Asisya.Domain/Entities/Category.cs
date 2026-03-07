using System.ComponentModel.DataAnnotations;

namespace Asisya.Domain.Entities
{
    public class Category {    
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public byte[]? Picture { get; set; } // Requerido para el GET /Products/{id} [cite: 14]
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    }
}