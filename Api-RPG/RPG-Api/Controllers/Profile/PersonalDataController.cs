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
        private readonly RpgDbContext context;
        private readonly IMapper _mapper;
        private readonly IPersonalDataService _personalDataService;
        public List<PersonalDataResource> per = new List<PersonalDataResource>();
        public List<AccountResource> allAccounts;


        public PersonalDataController(RpgDbContext context, IPersonalDataService personalDataService, IMapper mapper)
        {
            this.context = context;
            _mapper = mapper;
            _personalDataService = personalDataService;
            var acc = context.Accounts.Include(mbox => mbox.PersonalData).ToList();
            allAccounts = _mapper.Map<List<Account>, List<AccountResource>>(acc);
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


        [HttpGet("{data}")]
        public List<PersonalDataResource> Get(string data)
        {
            var profileList = _personalDataService.FindProfiles(data);
            var resources = _mapper.Map<List<PersonalData>, List<PersonalDataResource>>(profileList);
            return resources;
        }


        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]PersonalData profile)
        {
            Console.WriteLine(id + " id");
            var toUpdate = context.Accounts.Find(id);
            Console.WriteLine(id + " " + toUpdate.PersonalData.firstname + " " + toUpdate.PersonalData.lastname + " " + toUpdate.PersonalData.age);
            Console.WriteLine(id + " " + profile.firstname + " " + profile.lastname + " " + profile.age);
            if (toUpdate == null)
            {
                return NotFound();
            }

            //toUpdate.PersonalData = profile;
            toUpdate.PersonalData.firstname = profile.firstname;
            toUpdate.PersonalData.lastname = profile.lastname;
            toUpdate.PersonalData.email = profile.email;
            toUpdate.PersonalData.age = profile.age;
            toUpdate.PersonalData.city = profile.city;

            Console.WriteLine(id + " " + toUpdate.PersonalData.firstname + " " + toUpdate.PersonalData.lastname + " " + toUpdate.PersonalData.age);

            context.Accounts.Update(toUpdate);
            await context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
