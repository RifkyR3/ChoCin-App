using ChoCin_App.Entities;
using ChoCin_App.Server.Models;
using ChoCin_App.Server.Models.Form;
using ChoCin_App.Server.Models.Module;
using Microsoft.EntityFrameworkCore;

namespace ChoCin_App.Server.Services
{
    public class ModuleService
    {
        protected DefaultDbContext dbContext;

        public ModuleService(DefaultDbContext _dbContext)
        {
            this.dbContext = _dbContext;
        }

        public async Task<List<ModuleModel>> GetModules()
        {
            return await this.dbContext
                .CModules
                .AsNoTracking()
                .OrderBy(O => O.ModuleOrder)
                .Select(Q => new ModuleModel
                {
                    Id = Q.ModuleId,
                    Name = Q.ModuleName,
                    Icon = Q.ModuleIcon,
                    Path = Q.ModulePath,
                    Order = Q.ModuleOrder,
                    SubId = Q.ModuleSubId
                })
                .ToListAsync();
        }

        public async Task<ModuleModel?> GetModuleById(Guid id)
        {
            return await this.dbContext
                .CModules
                .AsNoTracking()
                .Where(W =>
                    W.ModuleId == id
                )
                .OrderBy(O => O.ModuleOrder)
                .Select(Q => new ModuleModel
                {
                    Id = Q.ModuleId,
                    Name = Q.ModuleName,
                    Icon = Q.ModuleIcon,
                    Path = Q.ModulePath,
                    Order = Q.ModuleOrder,
                    SubId = Q.ModuleSubId
                })
                .FirstOrDefaultAsync();
        }

        public async Task<bool> AddModule(ModuleInput module)
        {
            string pathModule = string.Empty;
            if (!string.IsNullOrEmpty(module.Path))
            {
                pathModule = module.Path;
            }

            CModule add = new CModule
            {
                ModuleId = Guid.NewGuid(),
                ModuleName = module.Name,
                ModuleIcon = module.Icon,
                ModulePath = pathModule,
                ModuleOrder = module.Order,
            };

            if (module.SubModuleId != Guid.Empty)
            {
                var subModule = await this.dbContext
                    .CModules
                    .Where(Q => Q.ModuleId == module.SubModuleId)
                    .FirstOrDefaultAsync();

                if (subModule != null)
                {
                    add.ModuleSub = subModule;
                }
            }

            this.dbContext.CModules.Add(add);
            var result = await dbContext.SaveChangesAsync();
            return result >= 0;
        }

        public async Task<bool> UpdateModule(Guid id, ModuleInput module)
        {
            var update = await this.dbContext
                .CModules
                .Where(Q => Q.ModuleId == id)
                .FirstOrDefaultAsync();

            if (update != null)
            {
                string pathModule = string.Empty; ;
                if (!string.IsNullOrEmpty(module.Path))
                {
                    pathModule = module.Path;
                }

                update.ModuleName = module.Name;
                update.ModuleIcon = module.Icon;
                update.ModulePath = pathModule;
                update.ModuleOrder = module.Order;

                if (update.ModuleSubId != null)
                {
                    update.ModuleSubId = null;
                }

                if (module.SubModuleId != Guid.Empty)
                {
                    var subModule = await this.dbContext
                    .CModules
                    .Where(Q => Q.ModuleId == module.SubModuleId)
                    .FirstOrDefaultAsync();

                    if (subModule != null)
                    {
                        update.ModuleSub = subModule;
                    }
                }

                dbContext.CModules.Update(update);
                var result = await dbContext.SaveChangesAsync();
                return result >= 0;
            }

            return false;
        }

        public async Task<bool> DeleteModule(Guid id)
        {
            var module = await this.dbContext
                .CModules
                .AsNoTracking()
                .Where(q => q.ModuleId == id)
                .FirstOrDefaultAsync();

            if (module != null)
            {
                this.dbContext.CModules.Remove(module);
                var result = await dbContext.SaveChangesAsync();
                return result >= 0;
            }

            return false;
        }

        public async Task<List<ModuleModel>> GetModuleByGroup(Guid groupId)
        {
            List<ModuleModel> result = await this.dbContext
                .CModules
                .AsNoTracking()
                .Where(W =>
                    W.ModuleSubId == null
                    && W.Groups.Select(WG => WG.GroupId).Contains(groupId)
                )
                .OrderBy(O => O.ModuleOrder)
                .Select(Q => new ModuleModel
                {
                    Id = Q.ModuleId,
                    Name = Q.ModuleName,
                    Icon = Q.ModuleIcon,
                    Path = Q.ModulePath,
                    Order = Q.ModuleOrder,
                    SubId = Q.ModuleSubId
                })
                .ToListAsync();

            foreach (var module in result)
            {
                var child = await this.GetChildModule(module.Id);
                if (child != null && child.Count() > 0)
                {
                    module.Children = child;
                }
            }

            return result;
        }

        public async Task<List<ModuleModel>> GetChildModule(Guid moduleId)
        {
            List<ModuleModel> result = await this.dbContext
                .CModules
                .AsNoTracking()
                .Where(W => W.ModuleSubId == moduleId)
                .OrderBy(O => O.ModuleOrder)
                .Select(Q => new ModuleModel
                {
                    Id = Q.ModuleId,
                    Name = Q.ModuleName,
                    Icon = Q.ModuleIcon,
                    Path = Q.ModulePath,
                    Order = Q.ModuleOrder,
                    SubId = Q.ModuleSubId,
                })
                .ToListAsync();

            foreach (var module in result)
            {
                var child = await this.GetChildModule(module.Id);
                if (child != null && child.Count() > 0)
                {
                    module.Children = child;
                }
            }

            return result;
        }

        public async Task<List<DropDownModel>> GetComboMainModule()
        {
            return await this.dbContext
            .CModules
            .Where(W => W.ModuleSub == null)
            .OrderBy(O => O.ModuleOrder)
            .Select(Q => new DropDownModel
            {
                Value = Q.ModuleId,
                Name = Q.ModuleName
            })
            .AsNoTracking()
            .ToListAsync();
        }

        public async Task<List<ModuleModel>> GetModuleTree()
        {
            List<ModuleModel> result = await this.dbContext
                .CModules
                .AsNoTracking()
                .Where(W => W.ModuleSubId == null)
                .OrderBy(O => O.ModuleOrder)
                .Select(Q => new ModuleModel
                {
                    Id = Q.ModuleId,
                    Name = Q.ModuleName,
                    Icon = Q.ModuleIcon,
                    Path = Q.ModulePath,
                    Order = Q.ModuleOrder,
                    SubId = Q.ModuleSubId
                })
                .ToListAsync();

            foreach (var module in result)
            {
                var child = await this.GetChildModule(module.Id);
                if (child != null && child.Count() > 0)
                {
                    module.Children = child;
                }
            }

            return result;
        }
    }
}