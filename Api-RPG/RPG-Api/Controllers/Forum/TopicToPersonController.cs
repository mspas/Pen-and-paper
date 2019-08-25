using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mdRPG.Models;
using mdRPG.Persistence;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mdRPG.Controllers
{
    public class TopicToPersonController : Controller
{
        // GET: /<controller>/
        private readonly RpgDbContext context;
        private readonly List<TopicToPerson> allTopicsToPersons = new List<TopicToPerson>();

        public TopicToPersonController(RpgDbContext context)
        {
            this.context = context;
            //allTopics = context.Topics.Include(m => m.Messages).ToList();
        }

        [HttpGet("{userId}")]
        public List<TopicToPerson> Get(int userId)
        {
            var foundT2P = new List<TopicToPerson>(); ;
            foreach (TopicToPerson t2p in allTopicsToPersons)
            {
                if (t2p.userId == userId)
                {
                    foundT2P.Add(t2p);
                }
            }
            return foundT2P;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]TopicToPerson t2p)
        {
            context.TopicsToPersons.Add(t2p);
            await context.SaveChangesAsync();
            return Ok(t2p);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TopicToPerson t2p)
        {
            var toUpdate = context.TopicsToPersons.Find(id);
            if (toUpdate == null)
            {
                return NotFound();
            }

            toUpdate.lastActivitySeen = t2p.lastActivitySeen;
            context.TopicsToPersons.Update(toUpdate);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var toDelete = context.TopicsToPersons.Find(id);
            if (toDelete == null)
            {
                return NotFound();
            }

            context.TopicsToPersons.Remove(toDelete);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
