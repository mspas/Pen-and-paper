using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RPG.Api.Domain.Models;
using RPG.Api.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RPG.Api.Controllers
{
    [Route("api/[controller]")]
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
            var topic = context.Topics.Include(mbox => mbox.Messages).Include(mbox => mbox.UsersConnected).First(mbox => mbox.Id == topicId);
            if (topic.isPublic == false)
            {
                if (topic.UsersConnected.Count > 0)
                {
                    foreach (TopicToPerson per in topic.UsersConnected)
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
        public async Task<IActionResult> Post([FromBody]CreateTopic data)
        {
            Topic topic = data.topic;
            string bodyMessage = data.bodyMessage;
            Console.WriteLine("msg wtf: " + bodyMessage);
            MessageForum message = new MessageForum(topic.createDate, bodyMessage, topic.authorId, 1);
            var game = context.Games.Include(mbox => mbox.participants).First(mbox => mbox.Id == topic.forumId);
            context.Topics.Add(topic);
            await context.SaveChangesAsync();
            message.topicId = topic.Id;
            if (topic.isPublic)
            {
                foreach (GameToPerson player in game.participants)
                {
                    var t2p = new TopicToPerson(topic.forumId, topic.Id, player.playerId);
                    if (player.Id == topic.authorId)
                        t2p.lastActivitySeen = topic.createDate;
                    context.TopicsToPersons.Add(t2p);
                }
            }
            context.MessagesForum.Add(message);
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

