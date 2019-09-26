using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RPG.Api.Domain.Models;
using RPG.Api.Persistence;
using Microsoft.AspNetCore.Mvc;
using RPG.Api.Domain.Services.SForum;
using AutoMapper;
using RPG.Api.Resources;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mdRPG.Controllers
{
    [Route("api/[controller]")]
    public class TopicToPersonController : Controller
    {
        private readonly ITopicToPersonService _topicToPersonService;
        private readonly IMapper _mapper;

        public TopicToPersonController(ITopicToPersonService topicToPersonService, IMapper mapper)
        {
            _topicToPersonService = topicToPersonService;
            _mapper = mapper;
        }

        [HttpGet("{userId}/{forumId}")]
        public async Task<List<TopicToPersonResource>> Get(int userId, int forumId)       //-1 means request for notifications
        {
            var t2pList = await _topicToPersonService.GetT2PListAsync(userId, forumId);
            var t2pResource = _mapper.Map<List<TopicToPerson>, List<TopicToPersonResource>>(t2pList);
            return t2pResource;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]TopicToPerson t2p)
        {
            var response = await _topicToPersonService.AddT2PAsync(t2p);
            if (response.Success)
            {
                return Ok(response.TopicToPerson);
            }
            return NotFound(response.Message);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TopicToPerson t2p)
        {
            var response = await _topicToPersonService.EditT2PAsync(t2p);
            if (response.Success)
            {
                return Ok(response.TopicToPerson);
            }
            return NotFound(response.Message);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _topicToPersonService.DeleteT2PAsync(id);
            if (response.Success)
            {
                return Ok(response.Success);
            }
            return NotFound(response.Message);
        }
    }
}
