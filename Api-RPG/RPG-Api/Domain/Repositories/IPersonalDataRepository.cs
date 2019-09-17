using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Repositories
{
    public interface IPersonalDataRepository
    {
        Task<PersonalData> GetProfile(string login);
        Task<PersonalData> GetProfile(int id);
        Task<List<PersonalData>> GetList();
        Task<BaseResponse> UpdateProfile(PersonalData toUpdate);
    }
}
