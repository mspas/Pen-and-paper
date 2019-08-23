using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mdRPG.Models;
using mdRPG.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mdRPG.Controllers
{
    public class TopicController : Controller
{
        // GET: /<controller>/
        private readonly RpgDbContext context;
        //private readonly List<Topic> allTopics = new List<Topic>();

        public TopicController(RpgDbContext context)
        {
            this.context = context;
            //allTopics = context.Topics.Include(m => m.Messages).ToList();
        }

        [HttpGet("{userId}/{topicId}")]
        public Topic Get(int userId, int topicId)
        {
            var topic = context.Topics.Include(mbox => mbox.Messages).Include(mbox => mbox.UsersPermissions).First(mbox => mbox.Id == topicId);
            if (topic.isPublic == false)
            {
                if (topic.UsersPermissions.Count > 0)
                {
                    foreach (UserPermitted per in topic.UsersPermissions)
                    {
                        if (per.userId == userId)
                            return topic;
                    }
                    return null;
                }
                else
                    return null;
            }
            return topic;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Topic topic)
        {
            context.Topics.Add(topic);
            await context.SaveChangesAsync();
            return Ok(topic);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Topic topic)
        {
            var toUpdate = context.Topics.Find(id);
            if (toUpdate == null)
            {
                return NotFound();
            }

            toUpdate.lastActivityDate = topic.lastActivityDate;
            toUpdate.isPublic = topic.isPublic;
            toUpdate.topicName = topic.topicName;

            context.Topics.Update(toUpdate);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var toDelete = context.Topics.Find(id);
            if (toDelete == null)
            {
                return NotFound();
            }

            context.Topics.Remove(toDelete);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}

