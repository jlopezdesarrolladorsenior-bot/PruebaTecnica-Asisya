using Microsoft.AspNetCore.Mvc;
using Asisya.Domain.Entities;
using Asisya.Domain.Interfaces; 

namespace Asisya.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        // 1. Declaramos la interfaz del repositorio
        private readonly IProductRepository _repository;

        // 2. Inyectamos la interfaz en el constructor
        public CategoryController(IProductRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Category category)
        {
            if (category == null) return BadRequest();
            
            await _repository.AddCategoryAsync(category); 
            await _repository.SaveChangesAsync();
            return Ok(category);
        }

        [HttpGet("check-categories")]
        public async Task<IActionResult> CheckCategories()
        {
            // 3. Ahora '_repository' existe y es reconocido por el compilador
            var categories = await _repository.GetAllCategoriesAsync(); 
            
            // Retornamos solo lo necesario para validar en el Frontend
            return Ok(categories.Select(c => new { 
                c.CategoryId, 
                c.CategoryName 
            }));
        }
    }
}