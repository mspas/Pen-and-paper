
using AutoMapper;
using RPG.Api.Resources;
using RPG.Api.Domain.Models;
using RPG.Api.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RPG.Api.Domain.Services;
using RPG.Api.Domain.Models.Enums;

namespace mdRPG.Controllers
{
    public class AccountController : Controller
    {
        private readonly RpgDbContext context;
        private readonly IMapper _mapper;
        private readonly IAccountService _accountService;

        public AccountController(RpgDbContext context, IMapper mapper, IAccountService accountService)
        {
            this.context = context;
            _mapper = mapper;
            _accountService = accountService;
        }


        /* [HttpGet("/api/account")]
         public List<AccountResource> GetAccounts()
         {
             var acc = context.Accounts.Include(mbox => mbox.PersonalData).ToList();
             return mapper.Map<List<Account>, List<AccountResource>>(acc);
         }*/

        /*[HttpPost("/api/account")]
        public async Task<IActionResult> CreateAccount([FromBody] Account account)
        {
            account.PersonalData.photoName = "unknown.png";       
            context.Accounts.Add(account);
            await context.SaveChangesAsync();
            return Ok(account);
        }*/

        [HttpPost("/api/account")]
        public async Task<IActionResult> CreateAccount([FromBody] AccountCredentialsResource accountCredentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var account = _mapper.Map<AccountCredentialsResource, Account>(accountCredentials);

            var response = await _accountService.CreateUserAsync(account, ERole.Common);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            var accountResponse = _mapper.Map<Account, AccountResource>(response.Account);
            return Ok(accountResponse);
        }

        [HttpPut("/api/account/{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ChangePassword passwordData)
        {
            var toUpdate = context.Accounts.Find(id);
            if (toUpdate == null)
            {
                return NotFound();
            }

            if (passwordData.oldpass != toUpdate.password)
            { 
                return NotFound();
            }

            toUpdate.password = passwordData.newpass;

            context.Accounts.Update(toUpdate);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
