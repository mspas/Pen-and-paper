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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mdRPG.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    public class FriendController : Controller
{
    private readonly RpgDbContext context;
    private readonly IMapper mapper;
    public List<PersonalDataResource> per = new List<PersonalDataResource>();
    public List<AccountResource> allAccounts;


    public FriendController(RpgDbContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
        var acc = context.Accounts.Include(mbox => mbox.PersonalData).ToList();
        allAccounts = mapper.Map<List<Account>, List<AccountResource>>(acc);
        foreach (AccountResource a in allAccounts)
        {
                per.Add(a.PersonalData);
        }
     }
        // GET: api/<controller>
        [HttpGet]
    public IEnumerable<string> Get()
    {
        return new string[] { "value1", "value2" };
    }

    // GET api/<controller>/5
    [HttpGet("{nick}")]
    public List<PersonalDataFriendResource> Get(string nick)
    {
            var friends = context.Friends.ToList();
            var foundFriends = new List<PersonalDataFriendResource>();

            if (int.TryParse(nick, out int relationId))
            {
                foreach (Friend fr in friends)
                {
                    if (fr.Id == relationId)
                    {
                        var friendSet = new PersonalDataFriendResource(fr.Id, null, fr.isAccepted, true, fr.isFriendRequest, fr.lastMessageDate);
                        foundFriends.Add(friendSet);
                        return foundFriends;
                    }
                }
            }

            int id = -1;
            foreach (PersonalDataResource p in per)
            {
                if (p.login == nick)
                {
                    id = p.Id;
                    break;
                }
            }

            foreach (Friend fr in friends)
            {
                if (fr.isFriendRequest)
                {
                    if (fr.player1Id == id)
                    {
                        var isReceiver = false;
                        var friendSet = new PersonalDataFriendResource(fr.Id, per.Find(ob => ob.Id == fr.player2Id), fr.isAccepted, isReceiver, fr.isFriendRequest, fr.lastMessageDate);
                        foundFriends.Add(friendSet);
                    }
                    if (fr.player2Id == id)
                    {
                        var isReceiver = true;
                        var friendSet = new PersonalDataFriendResource(fr.Id, per.Find(ob => ob.Id == fr.player1Id), fr.isAccepted, isReceiver, fr.isFriendRequest, fr.lastMessageDate);
                        foundFriends.Add(friendSet);
                    }
                }
            }
            return foundFriends;
    }
        
        [AllowAnonymous]
        [HttpPost]
    public async Task<IActionResult> CreateFriend([FromBody] Friend friend)
    {
        context.Friends.Add(friend);
        await context.SaveChangesAsync();
        return Ok(friend);
    }

    // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Friend friend)
        {
            var toUpdate = context.Friends.Find(id);
            if (toUpdate == null)
            {
               return NotFound();
            }

            toUpdate.isAccepted = friend.isAccepted;
            toUpdate.isFriendRequest = friend.isFriendRequest;
            toUpdate.lastMessageDate = friend.lastMessageDate;

            
            context.Friends.Update(toUpdate);
            await context.SaveChangesAsync();
            return NoContent();
        }

     // DELETE api/<controller>/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
            var toDelete = context.Friends.Find(id);
            if (toDelete == null)
            {
                return NotFound();
            }

            context.Friends.Remove(toDelete);
            await context.SaveChangesAsync();
            return NoContent();
    }
}
}
