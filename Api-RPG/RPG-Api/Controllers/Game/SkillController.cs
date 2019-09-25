using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RPG.Api.Domain.Models;
using RPG.Api.Persistence;
using Microsoft.AspNetCore.Mvc;
using RPG.Api.Domain.Services.SGame;
using AutoMapper;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mdRPG.Controllers
{
    [Route("api/[controller]")]
    public class SkillController : Controller
    {
        private readonly ISkillService _skillService;
        private readonly IMapper _mapper;

        public SkillController(ISkillService skillService, IMapper mapper)
        {
            _skillService = skillService;
            _mapper = mapper;
        }

        // GET api/<controller>/5
        [HttpGet("{gameId}")]
        public async Task<List<Skill>> Get(int gameId)
        {
            return await _skillService.GetSkillListAsync(gameId);
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> CreateSkill([FromBody] Skill skill)
        {
            var response = await _skillService.AddSkillAsync(skill);
            if (response.Success)
            {
                return Ok(response.Skill);
            }
            return NotFound(response.Message);
        }


        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _skillService.DeleteSkillAsync(id);
            if (response.Success)
            {
                return Ok(response.Success);
            }
            return NotFound(response.Message);
        }
    }
}
