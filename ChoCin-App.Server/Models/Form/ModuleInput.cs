using System.ComponentModel.DataAnnotations;

namespace ChoCin_App.Server.Models.Form
{
    public class ModuleInput
    {
        [Required]
        public string Name { get; set; }

        public string? Icon { get; set; }
        public string? Path { get; set; }

        [Required]
        public int Order { get; set; }

        public Guid? SubModuleId { get; set; }
    }
}