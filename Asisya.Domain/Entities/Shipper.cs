using System.ComponentModel.DataAnnotations;

namespace Asisya.Domain.Entities
{
    public class Shipper
    {   
        public int ShipperId { get; set; } 

        // Campos obligatorios en negrita en el diagrama
        public string CompanyName { get; set; } = string.Empty;
        
        public string? Phone { get; set; } 

        // Relación: Un transportista puede tener muchas órdenes
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();        
    }
}