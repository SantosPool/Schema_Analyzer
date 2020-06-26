using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Schema_Analyzer.Entities.Entities;
using Schema_Analyzer.Services;
using Schema_Analyzer.WebUtils;

namespace Schema_Analyzer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : BaseController
    {
        private IUserService userService;

        public AuthenticateController(IUserService _userService)
        {
            this.userService = _userService;
        }
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]User user)
        {
            var _user = this.userService.GetByName(user);
            if(_user==null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var token = Security.GenerateToken(user.Username);

            if (token == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            // return Ok(token);
            return Ok(new
            {
                user.Username,
                token.token,
                token.tokenExpiration,
                user.Id
            });
        }
    }
}