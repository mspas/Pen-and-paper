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
    public class ForumController : Controller
    {
        // GET: /<controller>/
        private readonly RpgDbContext context;
        private readonly List<Topic> allTopics = new List<Topic>();

        public ForumController(RpgDbContext context)
        {
            this.context = context;
            allTopics = context.Topics.Include(m => m.Messages).ToList();
        }

        [HttpGet("{id}")]
        public Forum Get(int id)
        {
            var forum = context.Forums.Find(id);
            forum.Topics = new List<Topic>();
            foreach (Topic topic in allTopics)
            {
                if (topic.forumId == forum.Id)
                    forum.Topics.Add(topic);
            }
            return forum;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Forum forum)
        {
            var toUpdate = context.Forums.Find(id);
            toUpdate.lastActivityDate = forum.lastActivityDate;
            toUpdate.isPublic = forum.isPublic;

            context.Forums.Update(toUpdate);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
