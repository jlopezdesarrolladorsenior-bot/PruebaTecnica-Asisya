using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Asisya.Infrastructure.Data; 
using Microsoft.Extensions.Configuration;
using Asisya.API.DTOs;

namespace Asisya.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ApplicationDbContext _context;

        public AuthController(IConfiguration config, ApplicationDbContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO login)
        {
            // Buscamos al usuario en la base de datos
            var user = _context.Users.FirstOrDefault(u => 
                u.Email == login.Email && u.Password == login.Password);

            if (user != null)
            {
                var jwtKey = _config["Jwt:Key"];
                var keyBytes = Encoding.ASCII.GetBytes(jwtKey!);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.Name, user.Email),
                        new Claim("Role", "Admin")
                    }),
                    Expires = DateTime.UtcNow.AddHours(2),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(keyBytes),
                        SecurityAlgorithms.HmacSha256Signature),
                    Issuer = _config["Jwt:Issuer"],
                    Audience = _config["Jwt:Audience"]
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);

                return Ok(new { Token = tokenHandler.WriteToken(token) });
            }

            return Unauthorized(new { Message = "Credenciales incorrectas" });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}