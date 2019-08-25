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
    public class MessageForumController : Controller
{
        // GET: /<controller>/

        private RpgDbContext context;

        public MessageForumController(RpgDbContext context)
        {
            this.context = context;
        }

        // GET api/<controller>/5 but its a id of relation person-person 
        /*[HttpGet("{id}")]
        public List<Message> Get(int id)
        {
            var messages = context.Messages.ToList();
            var conversation = new List<Message>();
            foreach (Message msg in messages)
            {
                if (msg.relationId == id)
                    conversation.Add(msg);
            }
            return conversation;
        }*/

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MessageForum message)
        {
            var toUpdateTopic = context.Topics.Include(mbox => mbox.UsersConnected).First(mbox => mbox.Id == message.topicId);
            var toUpdateForum = context.Forums.Find(toUpdateTopic.forumId);
            var toUpdateGame = context.Games.Include(mbox => mbox.participants).First(mbox => mbox.Id == toUpdateForum.Id);

            toUpdateTopic.lastActivityDate = message.sendDdate;
            toUpdateForum.lastActivityDate = message.sendDdate;
            toUpdateGame.lastActivityDate = message.sendDdate;

            foreach (GameToPerson player in toUpdateGame.participants)
            {
                foreach (TopicToPerson per in toUpdateTopic.UsersConnected)
                {
                    if (player.playerId == per.userId)
                    {
                        var toUpdateNotification = context.NotificationsData.Find(player.playerId);
                        toUpdateNotification.lastGameNotificationDate = message.sendDdate;
                        context.NotificationsData.Update(toUpdateNotification);
                    }
                }
            }

            context.Topics.Update(toUpdateTopic);
            context.Forums.Update(toUpdateForum);
            context.Games.Update(toUpdateGame);
            context.MessagesForum.Add(message);
            await context.SaveChangesAsync();
            return Ok(message);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] MessageForum message)
        {
            var toUpdate = context.MessagesForum.Find(id);
            if (toUpdate == null)
            {
                return NotFound();
            }

            toUpdate.bodyMessage = message.bodyMessage;
            toUpdate.editDate = message.editDate;

            context.MessagesForum.Update(toUpdate);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var toDelete = context.MessagesForum.Find(id);
            if (toDelete == null)
            {
                return NotFound();
            }

            context.MessagesForum.Remove(toDelete);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
