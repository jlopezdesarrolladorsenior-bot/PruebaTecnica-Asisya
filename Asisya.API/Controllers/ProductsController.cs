using Microsoft.AspNetCore.Mvc;
using Asisya.Domain.Entities;
using System.Diagnostics;
using Asisya.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Asisya.Domain.Interfaces;

namespace Asisya.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repository;

        public ProductsController(IProductRepository repository)
        {
            _repository = repository;
        }

        [Authorize]
        [HttpPost("seed-100k")]
        public async Task<IActionResult> SeedProducts()
        {
            // Usamos el método del repo en lugar de acceder a .Categories
            var category = await _repository.GetCategoryByNameAsync("Prueba Técnica Asisya");
            if (category == null)
            {
                category = new Category { CategoryName = "Prueba Técnica Asisya", Description = "Categoría para carga masiva" };
                await _repository.AddCategoryAsync(category);
                await _repository.SaveChangesAsync();
            }

            var products = new List<Product>();
            var random = new Random();

            for (int i = 1; i <= 100000; i++)
            {
                products.Add(new Product
                {
                    ProductName = $"Producto_{i}",
                    CategoryId = category.CategoryId,
                    UnitPrice = (decimal)(random.NextDouble() * 100),
                    UnitsInStock = (short)random.Next(1, 500),
                    Discontinued = false
                });
            }

            var stopwatch = Stopwatch.StartNew();
            // Encapsulado en el repositorio
            await _repository.AddRangeAsync(products);
            stopwatch.Stop();

            return Ok(new 
            { 
                Mensaje = "100.000 registros cargados exitosamente", 
                TiempoSegundos = stopwatch.Elapsed.TotalSeconds,
                PromedioPorSegundo = 100000 / stopwatch.Elapsed.TotalSeconds
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int pageSize = 50)
        {
            var total = await _repository.GetTotalCountAsync(search);
            var products = await _repository.GetPagedProductsAsync(search, page, pageSize);
            
            var data = products.Select(p => new ProductResponseDTO 
            {
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                CategoryName = p.Category != null ? p.Category.CategoryName : "N/A",
                UnitPrice = p.UnitPrice,
                UnitsInStock = p.UnitsInStock
            });

            return Ok(new { total, data });
        }

        [Authorize]        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _repository.GetByIdAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        [Authorize]  
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Product product)
        {
            if (id != product.ProductId) return BadRequest();
            await _repository.UpdateAsync(product);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _repository.GetByIdAsync(id);
            if (product == null) return NotFound();
            
            await _repository.DeleteAsync(id);
            return NoContent();
        }

        [Authorize]
        [HttpPost("associate-categories")]
        public async Task<IActionResult> AssociateProductsToCategories()
        {
            var catServidores = await _repository.GetCategoryByNameAsync("SERVIDORES");
            var catCloud = await _repository.GetCategoryByNameAsync("CLOUD");

            if (catServidores == null || catCloud == null)
                return BadRequest("Faltan las categorías 'SERVIDORES' o 'CLOUD'.");

            // Nota: Para los 100k registros, lo ideal sería un método en el Repo 
            // pero para efectos de la prueba, este ajuste funcionará:
            var allProducts = await _repository.GetPagedProductsAsync(null, 1, 100000);
            
            int count = 0;
            foreach (var product in allProducts)
            {
                product.CategoryId = (count < 50000) ? catServidores.CategoryId : catCloud.CategoryId;
                count++;
                await _repository.UpdateAsync(product);
            }

            return Ok(new { mensaje = "Asociación completada" });
        }
    }    
}