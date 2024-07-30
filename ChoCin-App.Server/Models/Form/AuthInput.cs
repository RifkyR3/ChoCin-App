using System.ComponentModel.DataAnnotations;

namespace ChoCin_App.Server.Models.Form
{
    public class AuthInput
    {
        [Required]
        [StringLength(100)]
        public string UserName { get; set; }

        [Required]
        [StringLength(50)]
        public string Password { get; set; }
    }
}