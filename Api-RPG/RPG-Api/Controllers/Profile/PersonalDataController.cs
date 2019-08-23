using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using mdRPG.Controllers.Resources;
using mdRPG.Models;
using mdRPG.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mdRPG.Controllers
{
    [Route("api/pdata")]
    public class PersonalDataController : Controller
    {
        private readonly RpgDbContext context;
        private readonly IMapper mapper;
        public List<PersonalDataResource> per = new List<PersonalDataResource>();
        public List<AccountResource> allAccounts;


        public PersonalDataController(RpgDbContext context, IMapper mapper)
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
        [HttpGet("{data}")]
        public List<PersonalDataResource> Get(string data)
        {
            var foundData = new List<PersonalDataResource>();
            var pattern = "";

            foreach (PersonalDataResource p in per)     
            {
                if (p.login == data)
                {
                    foundData.Add(p);
                    return foundData;
                }
            }

            string[] dataSearch = data.Split(".");
            if (dataSearch.Length > 0)                    
            {
                if (dataSearch[0] != "")
                    pattern += "(" + dataSearch[0] + ")";
                pattern += @"\w*(.)";

                if (dataSearch[1] != "")
                    pattern += "(" + dataSearch[1] + ")";
                pattern += @"\w*(.)";

                if (dataSearch[2] != "")
                    pattern += "(" + dataSearch[2] + ")";
                pattern += @"\w*";
            }
            Regex rgx = new Regex(pattern);

            foreach (PersonalDataResource p in per)
            {
                var nextData = p.firstname + "." + p.lastname + "." + p.login;
                if (rgx.IsMatch(nextData))
                {
                    foundData.Add(p);
                }
            }
            return foundData;

        }




         /*   if (dataSearch.Length > 1)                    //szukanie imie i nazwisko
            {
                foreach (PersonalDataResource p in per)
                {
                    if (dataSearch[1] == p.lastname)        //szukanie nazwisko
                    {
                        if (dataSearch[0] == p.firstname)   //szukanie imie wsrod znalezionych nazwisk
                        {
                            foundData.Add(p);
                        }
                    }
                }
            }
            else                                            //wpisano do szukania tylko jedno co nie jest loginem
            {
                foreach (PersonalDataResource p in per)
                {
                    if (dataSearch[0] == p.lastname)        //szukanie nazwisko
                    {
                        foundData.Add(p);
                    }
                    if (dataSearch[0] == p.firstname)        //szukanie imie
                    {
                        foundData.Add(p);
                    }
                }
            }
            return foundData;

        }*/



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
