using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using RPG.Api.Resources;
using RPG.Api.Domain.Models;
using RPG.Api.Persistence;
using RPG.Api.Domain.Services.SGame;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Services.Profile;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RPG.Api.Domain.Controllers
{
    [Route("api/[controller]")]
    public class GameController : Controller
    {
        private readonly IGameService _gameService;
        private readonly IPersonalDataService _personalDataService;
        private readonly IMapper _mapper;

        public GameController(IGameService gameService, IPersonalDataService personalDataService, IMapper mapper)
        {
            _gameService = gameService;
            _personalDataService = personalDataService;
            _mapper = mapper;
        }



        // GET api/<controller>/5

        [HttpGet("{data}")]
        public async Task<List<GameResource>> Get(string data)
        {
            var gamesList = await _gameService.FindGamesAsync(data);
            var gamesListResource = _mapper.Map<List<Game>, List<GameResource>>(gamesList);

            foreach (GameResource g in gamesListResource)
            {
                var participantsProfiles = new List<PersonalDataResource>();

                foreach (GameToPerson g2p in g.participants)
                {
                    var profile = await _personalDataService.GetProfileAsync(g2p.playerId);
                    var profileResource = _mapper.Map<PersonalData, PersonalDataResource>(profile);
                    participantsProfiles.Add(profileResource);
                }

                g.participantsProfiles = participantsProfiles;
            }

            return gamesListResource;
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Game game)
        {
            var response = await _gameService.AddGameAsync(game);
            if (response.Success)
            {
                return Ok(response.Game.Id);
            }
            return NotFound();
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]Game game)
        {
            var response = await _gameService.EditGameAsync(game);
            if (response.Success)
            {
                return Ok(response.Game.Id);
            }
            return NoContent();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _gameService.DeleteGameAsync(id);
            if (response.Success)
            {
                return Ok(response.Success);
            }
            return NoContent();
        }
    }
}
