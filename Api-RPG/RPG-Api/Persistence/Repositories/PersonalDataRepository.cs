using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Services.Communication;

namespace RPG.Api.Persistence.Repositories
{
    public class PersonalDataRepository : BaseRepository, IPersonalDataRepository
    {
        public PersonalDataRepository(RpgDbContext context) : base(context)
        {
        }

        public async Task<List<PersonalData>> GetList()
        {
            var accounts = await _context.Accounts.Include(mbox => mbox.PersonalData).ToListAsync();
            var pdata = new List<PersonalData>();
            foreach (Account acc in accounts)
            {
                pdata.Add(acc.PersonalData);
            }
            return pdata;
        }
        
        public async Task<PersonalData> GetProfile(string login)
        {
            var account =  await _context.Accounts.Include(mbox => mbox.PersonalData).FirstAsync(mbox => mbox.PersonalData.login == login);
            return account.PersonalData;
        }

        public async Task<PersonalData> GetProfile(int id)
        {
            var account =  await _context.Accounts.Include(mbox => mbox.PersonalData).FirstAsync( mbox => mbox.Id == id);
            return account.PersonalData;
        }

        public async Task<BaseResponse> UpdateProfile(PersonalData toUpdate)
        {
            var account = await _context.Accounts.Include(mbox => mbox.PersonalData).FirstAsync(mbox => mbox.Id == toUpdate.Id);
            account.PersonalData = toUpdate;
            _context.Accounts.Update(account);
            return new BaseResponse(true, null);
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
