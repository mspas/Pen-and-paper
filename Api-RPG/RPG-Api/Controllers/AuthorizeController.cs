using AutoMapper;
using RPG.Api.Resources;
using RPG.Api.Domain.Models;
using RPG.Api.Persistence;
using RPG.Api.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace mdRPG.Controllers
{
    [EnableCors("MyPolicy")]
    public class AuthorizeController : Controller
    {
        private readonly IAuthorizeService _authorizeService;
        private readonly RpgDbContext context;
        private readonly IMapper _mapper;

        public List<AccountResource> allAccounts;

        public AuthorizeController(IAuthorizeService authorizeService, RpgDbContext context, IMapper mapper)
        {
            _authorizeService = authorizeService;
            this.context = context;
            _mapper = mapper;
            var acc = context.Accounts.Include(mbox => mbox.PersonalData).ToList();
            allAccounts = mapper.Map<List<Account>, List<AccountResource>>(acc);
        }

        [AllowAnonymous]
        [HttpPost("/api/login")]
        public IActionResult CreateToken([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IActionResult response = Unauthorized();

            var tokenString = _authorizeService.CreateAccessToken(model);
            if (tokenString != null)
                return Ok(new { token = tokenString });

            return response;
        }

        [HttpGet, Authorize]
        public IActionResult GetLoginOfLoggedUser()
        {
            var currentUser = HttpContext.User;
            var login = currentUser.Claims.First(c => c.Type == ClaimTypes.Name).Value;
            return Ok(login);
        }
    }
}
