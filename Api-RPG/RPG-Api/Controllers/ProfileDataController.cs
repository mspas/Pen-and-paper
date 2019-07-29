using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using mdRPG.Controllers.Resources;
using mdRPG.Models;
using mdRPG.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace RPG_Api.Controllers
{
    [Produces("application/json")]
    [Route("api/ProfileData")]
    public class ProfileDataController : Controller
    {
        private readonly RpgDbContext context;
        private readonly IMapper mapper;
        public List<PersonalDataResource> per = new List<PersonalDataResource>();
        public List<AccountResource> allAccounts;


        public ProfileDataController(RpgDbContext context, IMapper mapper)
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
    }
}