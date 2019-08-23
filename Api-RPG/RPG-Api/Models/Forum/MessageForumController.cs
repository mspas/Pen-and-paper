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
           /* var toUpdateTopic = context.Topics.Find(message.topicId);
            var toUpdateForum = context.Forums.Find(toUpdateTopic.forumId);
            var toUpdateGame = context.Games.Find(toUpdateForum.Id);

            int notificationId;
            if (toUpdateRelation.player1Id == message.senderId)
                notificationId = toUpdateRelation.player2Id;
            else
                notificationId = toUpdateRelation.player1Id;

            var toUpdateNotif = context.NotificationsData.Find(notificationId);
            toUpdateNotif.lastMessageDate = message.sendDdate;
            toUpdateRelation.lastMessageDate = message.sendDdate;

            context.NotificationsData.Update(toUpdateNotif);
            context.Friends.Update(toUpdateRelation);
            context.Messages.Add(message);
            await context.SaveChangesAsync();*/
            return Ok(message);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id)
        {
            var toUpdate = context.Messages.Find(id);
            if (toUpdate == null)
            {
                return NotFound();
            }

            toUpdate.wasSeen = true;

            context.Messages.Update(toUpdate);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var toDelete = context.Messages.Find(id);
            if (toDelete == null)
            {
                return NotFound();
            }

            context.Messages.Remove(toDelete);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
