using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using StudentPortalAPI.Dtos;

namespace StudentPortalAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthController : Controller
    {
        private IUserRepository _userRepository;
        public AuthController(IUserRepository userRepository)
        {
            this._userRepository = userRepository;     
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody]UserLoginDto userParam)
        {
            var user = _userRepository.Authenticate(userParam.Email, userParam.Password);

            if (user == null)
                return BadRequest(new { message = "email or password is incorrect" });

            return Ok(user);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok("logout");
        }
    }
}
