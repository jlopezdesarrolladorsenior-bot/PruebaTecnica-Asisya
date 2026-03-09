using Asisya.Domain.Entities;
using Asisya.Domain.Interfaces;
using Asisya.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using EFCore.BulkExtensions;

namespace Asisya.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Product?> GetByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.ProductId == id);
        }
      
        public async Task<IEnumerable<Product>> GetPagedProductsAsync(string? search, int page, int pageSize)
        {
            var query = _context.Products.AsNoTracking().AsQueryable();

            // Filtro por descripción
            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(p => p.ProductName.ToLower().Contains(search.ToLower()));
            }

            return await query
                .OrderBy(p => p.ProductId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Include(p => p.Category)
                .ToListAsync();
        }
        
        public async Task<int> GetTotalCountAsync(string? search)
        {
            var query = _context.Products.AsQueryable();
            if (!string.IsNullOrEmpty(search))
                query = query.Where(p => p.ProductName.Contains(search));
            
            return await query.CountAsync();
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task AddRangeAsync(IEnumerable<Product> products)
        {
            
            await _context.BulkInsertAsync(products.ToList());
        }

        public async Task AddAsync(Product product)
        {
            await _context.Products.AddAsync(product);
        }

        public async Task<Category?> GetCategoryByNameAsync(string name)
        {
            return await _context.Categories.FirstOrDefaultAsync(c => c.CategoryName == name);
        }

        
        public async Task AddCategoryAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
       
        public async Task UpdateAsync(Product product)
        {
            
            var existingEntity = await _context.Products.FindAsync(product.ProductId);
            
            if (existingEntity != null)
            {                
                _context.Entry(existingEntity).CurrentValues.SetValues(product);
                _context.Entry(existingEntity).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }
    }
}