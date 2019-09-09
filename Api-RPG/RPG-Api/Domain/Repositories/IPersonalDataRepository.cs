using RPG.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Repositories
{
    public interface IPersonalDataRepository
    {
        PersonalData GetProfile(string login);
        PersonalData GetProfile(int id);
        List<PersonalData> GetList();
    }
}
