using System.ComponentModel.DataAnnotations;

namespace Asisya.Domain.Entities
{
    public class Employee {    
        public int EmployeeId { get; set; }
        public string LastName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string? Title { get; set; }
        public DateTime? BirthDate { get; set; }
        public DateTime? HireDate { get; set; }
                
    }
}