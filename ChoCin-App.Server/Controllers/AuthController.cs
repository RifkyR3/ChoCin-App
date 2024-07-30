using ChoCin_App.Server.Models.Auth;
using ChoCin_App.Server.Models.Form;
using ChoCin_App.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChoCin_App.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService authService;

        public AuthController(AuthService _authService)
        {
            this.authService = _authService;
        }

        [HttpPost("authenticate")]
        public async Task<ActionResult<JwtAuthResponse>> Authenticate(AuthInput model)
        {
            var response = await this.authService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return response;
        }
    }
}