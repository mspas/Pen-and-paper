using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using mdRPG.Controllers.Resources;
using mdRPG.Models;
using mdRPG.Persistence;
using mdRPG.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mdRPG.Controllers
{
    [Route("api/[controller]")]
public class GameController : Controller
{
        private readonly RpgDbContext context;
        private readonly IMapper mapper;
        public List<PersonalDataResource> personalDataAll = new List<PersonalDataResource>();
        public List<AccountResource> allAccounts;
        public List<Game> allGames = new List<Game>();
        private DbRepository dbRepository;

        public GameController(RpgDbContext context, IMapper mapper, DbRepository dbRepository)
        {
            this.context = context;
            this.dbRepository = dbRepository;
            var acc = context.Accounts.Include(mbox => mbox.PersonalData).ToList();
            allAccounts = mapper.Map<List<Account>, List<AccountResource>>(acc);
            allGames = context.Games.Include(mbox => mbox.gameMaster).Include(mbox => mbox.participants).Include(mbox => mbox.sessions).Include(mbox => mbox.skillSetting).ToList();


            foreach (AccountResource a in allAccounts)
            {
                personalDataAll.Add(a.PersonalData);
            }
        }

        // GET: api/<controller>
        [HttpGet]
    public List<Game> Get()
    {
            //var allGames = context.Games.Include(mbox => mbox.gameMaster).Include(mbox => mbox.participants).Include(mbox => mbox.sessions).Include(mbox => mbox.skillSetting).ToList();
            return allGames;
            
    }

    // GET api/<controller>/5

        [HttpGet("{data}")]
        public List<GameResource> Get(string data)
        {
            var foundData = new List<GameResource>();
            var pattern = "";
            DateTime dateFrom = DateTime.Parse("1000-01-01");
            DateTime dateTo = DateTime.Parse("9999-01-01");
            bool onlyFree = true;

            if (Int32.TryParse(data, out int id))
            {
                foundData.Add(dbRepository.GetGame(id));
                return foundData;
            }
            else
            {
                string[] dataSearch = data.Split(".");
                if (dataSearch.Length > 0)
                {
                    if (dataSearch[0] != "")
                        pattern += "(" + dataSearch[0] + ")";
                    pattern += @"\w*(.)";

                    if (dataSearch[1] != "")
                        pattern += "(" + dataSearch[1] + ")";
                    pattern += @"(.)";

                    if (dataSearch[2] != "")
                        pattern += "(" + dataSearch[2] + ")";
                    pattern += @"\w*";

                    if (dataSearch[3] != "")
                        dateFrom = DateTime.Parse(dataSearch[3]);

                    if (dataSearch[4] != "")
                        dateTo = DateTime.Parse(dataSearch[4]);

                    if (dataSearch[5] != "Yes")
                        onlyFree = false;
                }
                Regex rgx = new Regex(pattern);

                var foundGamesWithFree = new List<GameResource>();

                foreach (Game game in allGames)
                {
                    var nextData = game.title + "." + game.category + "." + game.location;
                    if (rgx.IsMatch(nextData))
                    {
                        if (onlyFree)
                        {
                            if (game.nofplayers - game.participants.Count > 0)
                            {
                                if (DateTime.Compare(dateFrom, game.date) < 0 && DateTime.Compare(game.date, dateTo) < 0)
                                    foundData.Add(dbRepository.GetGame(game.Id));
                            }
                        }
                        else
                        {
                            if (DateTime.Compare(dateFrom, game.date) < 0 && DateTime.Compare(game.date, dateTo) < 0)
                                foundData.Add(dbRepository.GetGame(game.Id));
                        }
                    }
                }
            }
            return foundData;
    }

    // POST api/<controller>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody]Game game)
    {
        context.Games.Add(game);
        var gameToPerson = new GameToPerson
        {
            gameId = game.Id,
            playerId = game.masterId,
            isGameMaster = true,
            isAccepted = true,
            isMadeByPlayer = true
        };
        context.GamesToPerson.Add(gameToPerson);
        await context.SaveChangesAsync();
        return Ok(gameToPerson);
    }

    // PUT api/<controller>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
    }

    // DELETE api/<controller>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
}
}
