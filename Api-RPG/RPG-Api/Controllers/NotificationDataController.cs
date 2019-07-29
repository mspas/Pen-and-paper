using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using mdRPG.Models;
using mdRPG.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace RPG_Api.Controllers
{
    [Produces("application/json")]
    [Route("api/NotificationData")]
    public class NotificationDataController : Controller
    {
        private readonly RpgDbContext context;
        private readonly IMapper mapper;
        public List<NotificationData> allNotfData;

        public NotificationDataController(RpgDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
            allNotfData = context.NotificationsData.ToList();
        }


        [HttpGet("{id}")]
        public NotificationData Get(int id)
        {
            var result = new NotificationData();
            foreach (NotificationData notf in allNotfData)
            {
                if (notf.Id == id)
                {
                    result = notf;
                }
            }
            return result;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] NotificationData data)
        {
            var toUpdate = context.NotificationsData.Find(id);
            if (toUpdate == null)
            {
                return NotFound();
            }

            toUpdate.lastMessageDate = data.lastMessageDate;
            toUpdate.lastNotificationDate = data.lastNotificationDate;


            context.NotificationsData.Update(toUpdate);
            await context.SaveChangesAsync();
            return NoContent();
        }

    }
}