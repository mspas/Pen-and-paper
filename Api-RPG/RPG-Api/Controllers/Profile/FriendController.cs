using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using RPG.Api.Resources;
using RPG.Api.Domain.Models;
using RPG.Api.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mdRPG.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    public class FriendController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IFriendService _friendService;
        private readonly IPersonalDataService _personalDataService;

        public FriendController(IMapper mapper, IFriendService friendService, IPersonalDataService personalDataService)
        {
            _mapper = mapper;
            _friendService = friendService;
            _personalDataService = personalDataService;
        }


        // GET api/<controller>/5
        [HttpGet("{nick}")]
        public async Task<List<FriendResource>> Get(string nick)
        {
            var foundFriends = new List<FriendResource>();

            if (int.TryParse(nick, out int relationId))
            {
                foundFriends.Add(await _friendService.GetFriendForTimestampAsync(relationId));
                return foundFriends;
            }

            var profileList = await _personalDataService.FindProfilesAsync(nick);
            if (profileList == null)
            {
                return null;
            }

            var profile = profileList.First();
            foundFriends = await _friendService.GetFriendsListAsync(profile.Id);
            return foundFriends;

        }
        
        [HttpPost]
        public async Task<IActionResult> CreateFriend([FromBody] Friend friend)
        {
            var response = await _friendService.AddFriendAsync(friend);
            if (response.Success)
            {
                return Ok(response.Friend);
            }
            return NoContent();
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] FriendResource friend)
        {
            var response = await _friendService.EditFriendAsync(friend);
            if (response.Success)
            {
                return Ok(response.Friend.Id);
            }
            return NoContent();
        }

         // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _friendService.DeleteFriendAsync(id);
            if (response.Success)
            {
                return Ok(true);
            }
            return NoContent();
        }
    }
}
