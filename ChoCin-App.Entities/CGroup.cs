using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ChoCin_App.Entities;

[Table("c_group", Schema = "default")]
public partial class CGroup
{
    [Key]
    [Column("group_id")]
    public Guid GroupId { get; set; }

    [Column("group_name")]
    public string GroupName { get; set; } = null!;

    [ForeignKey("GroupId")]
    [InverseProperty("Groups")]
    public virtual ICollection<CModule> Modules { get; set; } = new List<CModule>();

    [ForeignKey("GroupId")]
    [InverseProperty("Groups")]
    public virtual ICollection<CUser> Users { get; set; } = new List<CUser>();
}
