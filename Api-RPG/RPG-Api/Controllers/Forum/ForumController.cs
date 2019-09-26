using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RPG.Api.Domain.Models;
using RPG.Api.Resources;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Services.SForum;
using AutoMapper;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mdRPG.Controllers
{
    [Route("api/[controller]")]
    public class ForumController : Controller
    {
        private readonly IForumService _forumService;
        private readonly IMapper _mapper;

        public ForumController(IForumService forumService, IMapper mapper)
        {
            _forumService = forumService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ForumResource> Get(int id)
        {
            return await _forumService.GetForumAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Forum forum)
        {
            var response = await _forumService.EditForumAsync(forum);
            if (response.Success)
            {
                return Ok(response.Success);
            }
            return NotFound();
        }
    }
}
