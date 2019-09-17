using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using RPG.Api.Resources;
using RPG.Api.Domain.Models;
using RPG.Api.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mdRPG.Controllers
{
    [Route("api/pdata")]
    public class PersonalDataController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IPersonalDataService _personalDataService;


        public PersonalDataController(IPersonalDataService personalDataService, IMapper mapper)
        {
            _mapper = mapper;
            _personalDataService = personalDataService;
        }


        [HttpGet("{data}")]
        public async Task<List<PersonalDataResource>> Get(string data)
        {
            var profileList = await _personalDataService.FindProfilesAsync(data);
            var resources = _mapper.Map<List<PersonalData>, List<PersonalDataResource>>(profileList);
            return resources;
        }


        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]PersonalData profile)
        {
            var response = await _personalDataService.EditProfileDataAsync(id, profile);
            if (response.Success)
            {
                return Ok();
            }
            else
            {
                return NotFound(response.Message);
            }
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
