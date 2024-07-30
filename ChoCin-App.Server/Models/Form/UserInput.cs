using System.ComponentModel.DataAnnotations;

namespace ChoCin_App.Server.Models.Form
{
    public class UserInput
    {
        public string Name { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        public List<Guid>? GroupIds { get; set; }
    }
}