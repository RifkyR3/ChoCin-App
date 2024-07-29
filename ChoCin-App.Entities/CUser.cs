using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ChoCin_App.Entities;

[Table("c_user", Schema = "default")]
[Index("Username", Name = "c_user_pk_2", IsUnique = true)]
public partial class CUser
{
    [Key]
    [Column("user_id")]
    public Guid UserId { get; set; }

    [Column("username")]
    public string Username { get; set; } = null!;

    [Column("user_password")]
    public string UserPassword { get; set; } = null!;

    [Column("user_full_name")]
    public string? UserFullName { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("Users")]
    public virtual ICollection<CGroup> Groups { get; set; } = new List<CGroup>();
}
