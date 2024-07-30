using ChoCin_App.Server.Helpers;
using ChoCin_App.Server.Models;
using ChoCin_App.Server.Models.Form;
using ChoCin_App.Server.Models.Group;
using ChoCin_App.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChoCin_App.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GroupController : ControllerBase
    {
        private readonly GroupService groupService;

        public GroupController(GroupService _groupService)
        {
            this.groupService = _groupService;
        }

        [HttpGet(Name = "getListGroup")]
        public async Task<ActionResult<List<GroupModel>>> GetListGroup()
        {
            return await this.groupService.GetGroups();
        }

        [HttpGet("{id}", Name = "getGroupById")]
        public async Task<ActionResult<GroupModel>> GetGroupById(Guid id)
        {
            var group = await this.groupService.GetGroupById(id);
            if (group == null)
            {
                return new NotFoundResult();
            }
            return group;
        }

        [HttpPost(Name = "addGroup")]
        public async Task<IActionResult> AddGroup([FromBody] GroupInput value)
        {
            if (!await groupService.AddGroup(value))
            {
                return BadRequest();
            }

            return Ok(new
            {
                message = "Group Created Successfully"
            });
        }

        [HttpPut("{id}", Name = "updateGroup")]
        public async Task<IActionResult> UpdateGroup(Guid id, [FromBody] GroupInput value)
        {
            if (!await groupService.UpdateGroup(id, value))
            {
                return BadRequest();
            }

            return Ok(new
            {
                message = "Group Updated Successfully"
            });
        }

        [HttpDelete("{id}", Name = "deleteGroup")]
        public async Task<IActionResult> DeleteGroup(Guid id)
        {
            if (!await groupService.DeleteGroup(id))
            {
                return BadRequest();
            }

            return Ok(new
            {
                message = "Group Deleted Successfully"
            });
        }

        [HttpGet("getComboGroup", Name = "getComboGroup")]
        public async Task<ActionResult<List<DropDownModel>>> GetComboGroup()
        {
            return await groupService.GetComboGroup();
        }
    }
}