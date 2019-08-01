﻿using AutoMapper;
using mdRPG.Controllers.Resources;
using mdRPG.Models;
using mdRPG.Persistence;
using mdRPG.Services;
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
        private readonly IMapper mapper;

        public List<AccountResource> allAccounts;

        public AuthorizeController(IAuthorizeService authorizeService, RpgDbContext context, IMapper mapper)
        {
            _authorizeService = authorizeService;
            this.context = context;
            this.mapper = mapper;
            var acc = context.Accounts.Include(mbox => mbox.PersonalData).ToList();
            allAccounts = mapper.Map<List<Account>, List<AccountResource>>(acc);
        }

        [AllowAnonymous]
        [HttpPost("/api/login")]
        public IActionResult CreateToken([FromBody] LoginModel model)
        {
            IActionResult response = Unauthorized();

            var account = new LoginModel
            {
                login = model.login,
                password = model.password,
            };

            var tokenString = _authorizeService.Authenticate(account, allAccounts);
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