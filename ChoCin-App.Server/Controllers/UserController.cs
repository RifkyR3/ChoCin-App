using ChoCin_App.Server.Helpers;
using ChoCin_App.Server.Models.Form;
using ChoCin_App.Server.Models.User;
using ChoCin_App.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChoCin_App.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;

        public UserController(UserService _userService)
        {
            this.userService = _userService;
        }

        [HttpGet(Name = "getListUser")]
        public async Task<ActionResult<List<UserModel>>> GetListUser()
        {
            return await userService.GetUsers();
        }

        [HttpGet("{id}", Name = "getUserById")]
        public async Task<ActionResult<UserModel>> GetUserById(Guid id)
        {
            var user = await userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost(Name = "addUser")]
        public async Task<IActionResult> AddUser([FromBody] UserInput addUser)
        {
            if (!await userService.AddUser(addUser))
            {
                return BadRequest();
            }

            return Ok(new
            {
                message = "User Created Successfully"
            });
        }

        [HttpPut]
        [Route("{id}", Name = "updateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UserInput updateUser, [FromRoute] Guid id)
        {
            if (!await userService.UpdateUser(id, updateUser))
            {
                return BadRequest();
            }

            return Ok(new
            {
                message = "User Updated Successfully"
            });
        }

        [HttpDelete]
        [Route("{id}", Name = "deleteUser")]
        public async Task<IActionResult> DeleteUser([FromRoute] Guid id)
        {
            if (!await userService.DeleteUser(id))
            {
                return BadRequest();
            }

            return Ok(new
            {
                message = "User Deleted Successfully"
            });
        }
    }
}