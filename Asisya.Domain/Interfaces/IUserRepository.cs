using Asisya.Domain.Entities;
namespace Asisya.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> Login(string email, string password);
    }
}