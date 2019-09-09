using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace RPG.Api.Persistence.Repositories
{
    public class PersonalDataRepository : BaseRepository, IPersonalDataRepository
    {
        public PersonalDataRepository(RpgDbContext context) : base(context)
        {
        }

        public List<PersonalData> GetList()
        {
            var accounts = _context.Accounts.Include(mbox => mbox.PersonalData).ToList();
            var pdata = new List<PersonalData>();
            foreach (Account acc in accounts)
            {
                pdata.Add(acc.PersonalData);
            }
            return pdata;
        }
        
        public PersonalData GetProfile(string login)
        {
            var account =  _context.Accounts.Include(mbox => mbox.PersonalData).First(mbox => mbox.PersonalData.login == login);
            return account.PersonalData;
        }

        public PersonalData GetProfile(int id)
        {
            var account =  _context.Accounts.Include(mbox => mbox.PersonalData).First( mbox => mbox.Id == id);
            return account.PersonalData;
        }

        /*public async Task<PersonalData> GetProfileAsync(string login)
        {
            var accounts = await _context.Accounts.Include(mbox => mbox.PersonalData).ToListAsync();
            PersonalData pdata = null;
            foreach (Account acc in accounts)
            {
                if (acc.login == login)
                {
                    pdata = acc.PersonalData;
                    return pdata;
                }
            }
            return pdata;
        }*/
    }
}
