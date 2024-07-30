using ChoCin_App.Server.Models.Group;

namespace ChoCin_App.Server.Models.User
{
    public class UserModel
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string? UserFullName { get; set; }
        public List<GroupModel>? Groups { get; set; }
    }
}