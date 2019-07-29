
using AutoMapper;
using mdRPG.Controllers.Resources;
using mdRPG.Models;
using mdRPG.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Controllers
{
    public class AccountController : Controller
    {
        private readonly RpgDbContext context;
        private readonly IMapper mapper;

        public AccountController(RpgDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }


        [HttpGet("/api/account")]
        public List<AccountResource> GetAccounts()
        {
            var acc = context.Accounts.Include(mbox => mbox.PersonalData).ToList();
            return mapper.Map<List<Account>, List<AccountResource>>(acc);
        }
        
        [HttpPost("/api/account")]
        public async Task<IActionResult> CreateAccount([FromBody] Account account)
        {
            account.PersonalData.photoName = "unknown.png";       
            context.Accounts.Add(account);
            await context.SaveChangesAsync();
            return Ok(account);
        }

        [HttpPut("/api/account/{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ChangePassword passwordData)
        {
            Console.WriteLine(id + " id");
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
