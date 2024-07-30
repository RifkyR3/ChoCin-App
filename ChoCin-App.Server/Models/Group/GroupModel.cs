namespace ChoCin_App.Server.Models.Group
{
    public class GroupModel
    {
        public Guid GroupId { get; set; }

        public string GroupName { get; set; }
        public List<Guid>? GroupModuleIds { get; set; }
    }
}