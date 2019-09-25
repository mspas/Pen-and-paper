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
    public class MySkillController : Controller
    {
        private readonly IMySkillService _mySkillService;
        private readonly IMapper _mapper;

        public MySkillController(IMySkillService mySkillService, IMapper mapper)
        {
            _mySkillService = mySkillService;
            _mapper = mapper;
        }


        // GET api/<controller>/5
        [HttpGet("{g2pId}")]
        public async Task<List<MySkill>> Get(int g2pId)
        {
            return await _mySkillService.GetMySkillListAsync(g2pId);
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> CreateMySkill([FromBody] MySkill mySkill)
        {
            var response = await _mySkillService.AddMySkillAsync(mySkill);
            if (response.Success)
            {
                return Ok(response.MySkill);
            }
            return NotFound(response.Message);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] MySkill mySkill)
        {
            var response = await _mySkillService.EditMySkillAsync(mySkill);
            if (response.Success)
            {
                return Ok(response.MySkill);
            }
            return NotFound(response.Message);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _mySkillService.DeleteMySkillAsync(id);
            if (response.Success)
            {
                return Ok(response.Success);
            }
            return NotFound(response.Message);
        }
    }
}
