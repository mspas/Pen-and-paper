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
using RPG.Api.Domain.Services.SGame;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mdRPG.Controllers
{
    [Route("api/[controller]")]
public class GameToPersonController : Controller
{
        private readonly IGameToPersonService _gameToPersonService;
        private readonly IMapper _mapper;

        public GameToPersonController(IGameToPersonService gameToPersonService, IMapper mapper)
        {
            _gameToPersonService = gameToPersonService;
            _mapper = mapper;
        }


        // GET api/<controller>/5
        [HttpGet("{nick}")]
        public async Task<List<GameToPersonResource>> Get(string nick)
        {
            var g2p = await _gameToPersonService.GetG2PListAsync(nick);
            var g2pResource = _mapper.Map<List<GameToPerson>, List<GameToPersonResource>>(g2p);
            return g2pResource;
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]GameToPerson g2p)
        {
            var response = await _gameToPersonService.AddG2PAsync(g2p);
            if (response.Success)
            {
                return Ok(response.GameToPerson);
            }
            return NotFound(response.Message);
        }

    // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]GameToPerson g2p)
        {
            var response = await _gameToPersonService.EditG2PAsync(g2p);
            if (response.Success)
            {
                return Ok(response.GameToPerson);
            }
            return NotFound(response.Message);
        }

    // DELETE api/<controller>/5
    [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _gameToPersonService.DeleteG2PAsync(id);
            if (response.Success)
            {
                return Ok(response.Success);
            }
            return NotFound();
        }
    }
}
