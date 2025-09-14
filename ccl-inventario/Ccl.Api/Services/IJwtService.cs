using Ccl.Api.Models;

namespace Ccl.Api.Services
{
    public interface IJwtService
    {
        (string token, DateTime expiresAt) CreateToken(User user);
    }
}
