using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ChoCin_App.Entities;

[Table("c_module")]
public partial class CModule
{
    [Key]
    [Column("module_id")]
    public Guid ModuleId { get; set; }

    [Column("module_sub_id")]
    public Guid? ModuleSubId { get; set; }

    [Column("module_name")]
    public string ModuleName { get; set; } = null!;

    [Column("module_icon")]
    public string? ModuleIcon { get; set; }

    [Column("module_path")]
    public string ModulePath { get; set; } = null!;

    [Column("module_order")]
    public int ModuleOrder { get; set; }

    [InverseProperty("ModuleSub")]
    public virtual ICollection<CModule> InverseModuleSub { get; set; } = new List<CModule>();

    [ForeignKey("ModuleSubId")]
    [InverseProperty("InverseModuleSub")]
    public virtual CModule? ModuleSub { get; set; }

    [ForeignKey("ModuleId")]
    [InverseProperty("Modules")]
    public virtual ICollection<CGroup> Groups { get; set; } = new List<CGroup>();
}
