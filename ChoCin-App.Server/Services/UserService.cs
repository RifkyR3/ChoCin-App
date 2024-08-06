using ChoCin_App.Entities;
using ChoCin_App.Server.Models.Form;
using ChoCin_App.Server.Models.Group;
using ChoCin_App.Server.Models.User;
using Microsoft.EntityFrameworkCore;

namespace ChoCin_App.Server.Services
{
    public class UserService
    {
        protected DefaultDbContext dbContext;

        public UserService(DefaultDbContext _dbContext)
        {
            this.dbContext = _dbContext;
        }

        public async Task<List<UserModel>> GetUsers()
        {
            return await this.dbContext
                .CUsers
                .AsNoTracking()
                .Select(
                Q => new UserModel
                {
                    UserFullName = Q.UserFullName,
                    UserId = Q.UserId,
                    UserName = Q.Username,
                    Groups = Q.Groups.Select(G => new GroupModel
                    {
                        GroupId = G.GroupId,
                        GroupName = G.GroupName,
                    }).ToList(),
                }).ToListAsync();
        }

        public async Task<UserModel?> GetUserById(Guid id)
        {
            return await this.dbContext
                .CUsers
                .AsNoTracking()
                .Select(
                Q => new UserModel
                {
                    UserFullName = Q.UserFullName,
                    UserId = Q.UserId,
                    UserName = Q.Username,
                    Groups = Q.Groups.Select(G => new GroupModel
                    {
                        GroupId = G.GroupId,
                        GroupName = G.GroupName,
                    }).ToList(),
                }).Where(q => q.UserId == id)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> AddUser(UserInput user)
        {
            var add = new CUser()
            {
                UserId = Guid.NewGuid(),
                Username = user.UserName,
                UserPassword = BCrypt.Net.BCrypt.HashPassword(user.Password),
                UserFullName = user.Name
            };

            if (user.GroupIds?.Count > 0)
            {
                var groups = await this.dbContext
                .CGroups
                .Where(Q => user.GroupIds.Contains(Q.GroupId))
                .ToListAsync();

                add.Groups = groups;
            }

            this.dbContext.CUsers.Add(add);
            var result = await dbContext.SaveChangesAsync();
            return result >= 0;
        }

        public async Task<bool> UpdateUser(Guid id, UserInput updateUser)
        {
            var user = await this.dbContext
                .CUsers
                .Include(u => u.Groups)
                .Where(q => q.UserId == id)
                .FirstOrDefaultAsync();

            if (user != null)
            {
                user.Username = updateUser.UserName;
                user.UserPassword = BCrypt.Net.BCrypt.HashPassword((string)updateUser.Password);
                user.UserFullName = updateUser.Name;

                if (user.Groups?.Count > 0)
                {
                    user.Groups.Clear();
                }

                if (updateUser.GroupIds?.Count > 0)
                {
                    var groups = await this.dbContext
                    .CGroups
                    .Where(Q => updateUser.GroupIds.Contains(Q.GroupId))
                    .ToListAsync();

                    user.Groups = groups;
                }

                dbContext.CUsers.Update(user);
                var result = await dbContext.SaveChangesAsync();
                return result >= 0;
            }
            return false;
        }

        public async Task<bool> DeleteUser(Guid id)
        {
            var user = await this.dbContext
                .CUsers
                .Include(Q => Q.Groups)
                .Where(q => q.UserId == id)
                .FirstOrDefaultAsync();

            if (user != null)
            {
                if(user.Groups?.Count > 0) {
                    user.Groups.Clear();
                }
                this.dbContext.CUsers.Remove(user);
                var result = await dbContext.SaveChangesAsync();
                return result >= 0;
            }

            return false;
        }
    }
}