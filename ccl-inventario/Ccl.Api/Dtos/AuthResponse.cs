namespace Ccl.Api.Dtos
{
    public class AuthResponse
    {
        public string Token { get; set; } = default!;
        public string Username { get; set; } = default!;
        public string Role { get; set; } = default!;
        public DateTime ExpiresAt { get; set; } 
    }
}
