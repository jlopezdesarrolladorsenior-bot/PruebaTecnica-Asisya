using Asisya.Domain.Entities;

namespace Asisya.Domain.Interfaces
{
    public interface IProductRepository
    {
        // Métodos para el controlador
        Task<Product?> GetByIdAsync(int id);
        Task<IEnumerable<Product>> GetPagedProductsAsync(string? search, int page, int pageSize);
        Task<int> GetTotalCountAsync(string? search);
        
        // Métodos para categorías
        Task<Category?> GetCategoryByNameAsync(string name);
        Task AddCategoryAsync(Category category);
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        
        // Métodos de acción
        Task AddRangeAsync(IEnumerable<Product> products);
        Task AddAsync(Product product);
        Task UpdateAsync(Product product);
        Task DeleteAsync(int id);
        Task SaveChangesAsync();
    }
}