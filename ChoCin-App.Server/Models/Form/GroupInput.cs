using System.ComponentModel.DataAnnotations;

namespace ChoCin_App.Server.Models.Form
{
    public class GroupInput
    {
        [Required]
        public string GroupName { get; set; }

        public List<Guid>? ModuleIds { get; set; }
    }
}