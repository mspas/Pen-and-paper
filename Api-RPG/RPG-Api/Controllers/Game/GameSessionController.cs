using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RPG.Api.Domain.Models;
using RPG.Api.Persistence;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mdRPG.Controllers
{
    [Route("api/[controller]")]
    public class GameSessionController : Controller
    {
        private readonly RpgDbContext context;

        public GameSessionController(RpgDbContext context)
        {
            this.context = context;
        }
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> CreateSession([FromBody] GameSession session)
        {
            context.GameSessions.Add(session);
            await context.SaveChangesAsync();
            return Ok(session);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var toDelete = context.GameSessions.Find(id);
            if (toDelete == null)
            {
                return NotFound();
            }

            context.GameSessions.Remove(toDelete);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
