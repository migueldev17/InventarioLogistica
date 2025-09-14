using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Ccl.Api.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Ccl.Api.Services
{
    public class JwtOptions
    {
        public string Issuer { get; init; } = default!;
        public string Audience { get; init; } = default!;
        public string Key { get; init; } = default!;
        public int ExpirationMinutes { get; init; }
    }

    public class JwtService : IJwtService
    {
        private readonly JwtOptions _opt;

        public JwtService(IOptions<JwtOptions> options)
        {
            _opt = options.Value;
        }

        public (string token, DateTime expiresAt) CreateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_opt.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var expires = DateTime.UtcNow.AddMinutes(_opt.ExpirationMinutes);

            var token = new JwtSecurityToken(
                issuer: _opt.Issuer,
                audience: _opt.Audience,
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return (new JwtSecurityTokenHandler().WriteToken(token), expires);
        }
    }
}
