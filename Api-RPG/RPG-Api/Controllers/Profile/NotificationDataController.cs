using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using RPG.Api.Domain.Models;
using RPG.Api.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Services.Profile;

namespace RPG_Api.Controllers
{
    [Produces("application/json")]
    [Route("api/NotificationData")]
    public class NotificationDataController : Controller
    {
        private readonly INotificationService _notificationService;
        private readonly IMapper mapper;

        public NotificationDataController(INotificationService notificationService, IMapper mapper)
        {
            _notificationService = notificationService;
            this.mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<NotificationData> Get(int id)
        {
            return await _notificationService.GetNotificationDataAsync(id);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] NotificationData data)
        {
            var response = await _notificationService.UpdateNotificationDataAsync(id, data);
            if (response.Success)
                return Ok(response.Message);
            return NoContent();
        }

    }
}