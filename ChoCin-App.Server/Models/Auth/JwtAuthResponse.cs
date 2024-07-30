using ChoCin_App.Server.Models.Group;

namespace ChoCin_App.Server.Models.Auth
{
    public class JwtAuthResponse
    {
        public Guid Id { get; set; }
        public string? FullName { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public List<GroupModel>? Groups { get; set; }
    }
}