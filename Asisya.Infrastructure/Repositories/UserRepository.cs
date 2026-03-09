using Asisya.Domain.Entities; 
using Asisya.Domain.Interfaces; 
using Asisya.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Asisya.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository 
    {
        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context) => _context = context;

        public async Task<User?> Login(string email, string password)
        {            
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        }
    }
}