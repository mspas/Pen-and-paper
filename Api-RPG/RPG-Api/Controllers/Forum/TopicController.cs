using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RPG.Api.Domain.Models;
using RPG.Api.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Services.SForum;
using AutoMapper;
using RPG.Api.Resources;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RPG.Api.Controllers
{
    [Route("api/[controller]")]
    public class TopicController : Controller
    {
        private readonly ITopicService _topicService;
        private readonly IMapper _mapper;

        public TopicController(ITopicService topicService, IMapper mapper)
        {
            _topicService = topicService;
            _mapper = mapper;
        }

        [HttpGet("{userId}/{topicId}")]
        public async Task<Topic> Get(int userId, int topicId)
        {
            return await _topicService.GetTopicAsync(userId, topicId);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]TopicCredentialsResource data)
        {
            var topic = _mapper.Map<TopicCredentials, Topic>(data.topic);
            var response = await _topicService.AddTopicAsync(topic, data.bodyMessage);

            if (response.Success)
            {
                return Ok(response.Topic);
            }
            return NotFound(response.Message);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Topic topic)
        {
            var response = await _topicService.EditTopicAsync(topic);

            if (response.Success)
            {
                return Ok(response.Topic);
            }
            return NotFound(response.Message);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _topicService.DeleteTopicAsync(id);

            if (response.Success)
            {
                return Ok(response.Success);
            }
            return NotFound(response.Message);
        }
    }
}

