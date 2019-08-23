using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mdRPG.Models;
using mdRPG.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace RPG_Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Message")]
    public class MessageController : Controller
    {
        private RpgDbContext context;

        public MessageController(RpgDbContext context)
        {
            this.context = context;
        }

        // GET api/<controller>/5 but its a id of relation person-person 
        [HttpGet("{id}")]
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
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Message message)
        {
            var toUpdateRelation = context.Friends.Find(message.relationId);

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
            await context.SaveChangesAsync();
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