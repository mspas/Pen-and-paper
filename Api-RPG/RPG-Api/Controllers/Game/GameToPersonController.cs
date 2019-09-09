using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using RPG.Api.Resources;
using RPG.Api.Domain.Models;
using RPG.Api.Persistence;
using RPG.Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mdRPG.Controllers
{
    [Route("api/[controller]")]
public class GameToPersonController : Controller
{
        private readonly RpgDbContext context;
        private readonly IMapper mapper;
        public List<PersonalDataResource> per = new List<PersonalDataResource>();
        public List<AccountResource> allAccounts;
        private DbRepository dbRepository;
        public List<Game> allGames = new List<Game>();

        public GameToPersonController(RpgDbContext context, IMapper mapper, DbRepository dbRepository)
        {
            this.context = context;
            this.dbRepository = dbRepository;
            var acc = context.Accounts.Include(mbox => mbox.PersonalData).ToList();
            allAccounts = mapper.Map<List<Account>, List<AccountResource>>(acc);
            

            foreach (AccountResource a in allAccounts)
            {
                per.Add(a.PersonalData);
            }
        }

// GET: api/<controller>
[HttpGet]
    public IEnumerable<string> Get()
    {
        return new string[] { "value1", "value2" };
    }

    // GET api/<controller>/5
    [HttpGet("{nick}")]
    public List<GameToPersonResource> Get(string nick)
    {
            int id = 0;
            foreach (PersonalDataResource p in per)
            {
                if (p.login == nick)
                {
                    id = p.Id;
                    break;
                }
            }
            return dbRepository.GetPlayersGames(id);
    }

    // POST api/<controller>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody]GameToPerson g2p)
    {
        context.GamesToPerson.Add(g2p);
        await context.SaveChangesAsync();
        return Ok(g2p);
    }

    // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]GameToPerson connection)
        {
            var toUpdate = context.GamesToPerson.Find(id);
            if (toUpdate == null)
            {
                return NotFound();
            }

            var toUpdateGame = context.Games.Find(toUpdate.gameId);
            
            toUpdate.isAccepted = true;
            toUpdateGame.nofparticipants += 1;

            context.GamesToPerson.Update(toUpdate);
            context.Games.Update(toUpdateGame);
            await context.SaveChangesAsync();
            return NoContent();
        }

    // DELETE api/<controller>/5
    [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var toDelete = context.GamesToPerson.Find(id);
            if (toDelete == null)
            {
                return NotFound();
            }

            if(toDelete.isAccepted)
            {
                var toUpdateGame = context.Games.Find(toDelete.gameId);
                toUpdateGame.nofparticipants -= 1;
                context.Games.Update(toUpdateGame);
            }

            context.GamesToPerson.Remove(toDelete);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
