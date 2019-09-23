using RPG.Api.Resources;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace mdRPG.Controllers
{
    [EnableCors("MyPolicy")]
    public class AuthorizeController : Controller
    {
        private readonly IAuthorizeService _authorizeService;


        public AuthorizeController(IAuthorizeService authorizeService)
        {
            _authorizeService = authorizeService;
        }

        [AllowAnonymous]
        [HttpPost("/api/login")]
        public async Task<IActionResult> CreateToken([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //IActionResult response = Unauthorized();

            var response = _authorizeService.CreateAccessToken(model);
            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Token);
        }

        [HttpGet, Authorize]
        public IActionResult GetLoginOfLoggedUser()
        {
            var currentUser = HttpContext.User;
            var login = currentUser.Claims.First(c => c.Type == ClaimTypes.Name).Value;
            return Ok(login);
        }

        [HttpPost("/api/login/refresh")]
        public async Task<IActionResult> RefreshTokenAsync([FromBody] RefreshTokenResource refreshToken)
        {
            Console.WriteLine("refresh " + refreshToken.Token);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var response = _authorizeService.RefreshTokenAsync(refreshToken.Token, refreshToken.Login);
            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            //var tokenResource = _mapper.Map<AccessToken, AccessTokenResource>(response.Token);
            return Ok(response.Token);
        }

        [Route("/api/login/revoke")]
        [HttpPost]
        public IActionResult RevokeToken([FromBody] string revokeToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _authorizeService.RevokeRefreshToken(revokeToken);
            return NoContent();
        }

    }
}
