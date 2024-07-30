using ChoCin_App.Server.Helpers;
using ChoCin_App.Server.Models;
using ChoCin_App.Server.Models.Form;
using ChoCin_App.Server.Models.Module;
using ChoCin_App.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChoCin_App.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ModuleController : ControllerBase
    {
        private readonly ModuleService moduleService;

        public ModuleController(ModuleService _moduleService)
        {
            this.moduleService = _moduleService;
        }

        [HttpGet(Name = "getListModule")]
        public async Task<ActionResult<List<ModuleModel>>> GetListModule()
        {
            return await moduleService.GetModules();
        }

        [HttpGet("{id}", Name = "getModuleById")]
        public async Task<ActionResult<ModuleModel>> GetModuleById(Guid id)
        {
            var user = await moduleService.GetModuleById(id);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost(Name = "addModule")]
        public async Task<IActionResult> AddModule([FromBody] ModuleInput addModule)
        {
            if (!await moduleService.AddModule(addModule))
            {
                return BadRequest();
            }

            return Ok(new
            {
                message = "Module Created Successfully"
            });
        }

        [HttpPut]
        [Route("{id}", Name = "updateModule")]
        public async Task<IActionResult> UpdateModule([FromBody] ModuleInput updateModule, [FromRoute] Guid id)
        {
            if (!await moduleService.UpdateModule(id, updateModule))
            {
                return BadRequest();
            }

            return Ok(new
            {
                message = "Module Updated Successfully"
            });
        }

        [HttpDelete]
        [Route("{id}", Name = "deleteModule")]
        public async Task<IActionResult> DeleteModule([FromRoute] Guid id)
        {
            if (!await moduleService.DeleteModule(id))
            {
                return BadRequest();
            }

            return Ok(new
            {
                message = "Module Deleted Successfully"
            });
        }

        [HttpGet]
        [Route("getModuleByGroup/{groupId}", Name = "getModuleByGroup")]
        public async Task<ActionResult<List<ModuleModel>>> GetModuleByGroup([FromRoute] Guid groupId)
        {
            return await moduleService.GetModuleByGroup(groupId);
        }

        [HttpGet]
        [Route("getComboMainModule", Name = "getComboMainModule")]
        public async Task<ActionResult<List<DropDownModel>>> GetComboMainModule()
        {
            return await moduleService.GetComboMainModule();
        }

        [HttpGet]
        [Route("getModuleTree", Name = "getModuleTree")]
        public async Task<ActionResult<List<ModuleModel>>> GetModuleTree()
        {
            return await moduleService.GetModuleTree();
        }
    }
}