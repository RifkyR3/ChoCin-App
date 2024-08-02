using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ChoCin_App.Entities;

public partial class DefaultDbContext : DbContext
{
    public DefaultDbContext(DbContextOptions<DefaultDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CGroup> CGroups { get; set; }

    public virtual DbSet<CModule> CModules { get; set; }

    public virtual DbSet<CUser> CUsers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CGroup>(entity =>
        {
            entity.HasKey(e => e.GroupId).HasName("c_group_pk");

            entity.Property(e => e.GroupId).ValueGeneratedNever();

            entity.HasMany(d => d.Modules).WithMany(p => p.Groups)
                .UsingEntity<Dictionary<string, object>>(
                    "CGroupModule",
                    r => r.HasOne<CModule>().WithMany()
                        .HasForeignKey("ModuleId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("c_group_module_c_module_moduleid_fk"),
                    l => l.HasOne<CGroup>().WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("c_group_module_c_group_groupid_fk"),
                    j =>
                    {
                        j.HasKey("GroupId", "ModuleId").HasName("c_group_module_pk");
                        j.ToTable("c_group_module");
                        j.IndexerProperty<Guid>("GroupId").HasColumnName("group_id");
                        j.IndexerProperty<Guid>("ModuleId").HasColumnName("module_id");
                    });
        });

        modelBuilder.Entity<CModule>(entity =>
        {
            entity.HasKey(e => e.ModuleId).HasName("c_module_pk");

            entity.Property(e => e.ModuleId).ValueGeneratedNever();
            entity.Property(e => e.ModuleOrder).HasDefaultValue(0);
            entity.Property(e => e.ModulePath).HasDefaultValueSql("''::text");

            entity.HasOne(d => d.ModuleSub).WithMany(p => p.InverseModuleSub).HasConstraintName("c_module_c_module_module_id_fk");
        });

        modelBuilder.Entity<CUser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("c_user_pk");

            entity.Property(e => e.UserId).ValueGeneratedNever();

            entity.HasMany(d => d.Groups).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "CUserGroup",
                    r => r.HasOne<CGroup>().WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("c_user_group_c_group_groupid_fk"),
                    l => l.HasOne<CUser>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("c_user_group_c_user_userid_fk"),
                    j =>
                    {
                        j.HasKey("UserId", "GroupId").HasName("c_user_group_pk");
                        j.ToTable("c_user_group");
                        j.IndexerProperty<Guid>("UserId").HasColumnName("user_id");
                        j.IndexerProperty<Guid>("GroupId").HasColumnName("group_id");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
