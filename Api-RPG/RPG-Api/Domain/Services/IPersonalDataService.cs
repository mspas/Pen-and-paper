using Microsoft.AspNetCore.Mvc;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services
{
    public interface IPersonalDataService
    {
        Task<PersonalData> GetProfile(string login);
        Task<PersonalData> GetProfile(int id);
        Task<List<PersonalData>> FindProfiles(string data);
        Task<BaseResponse> EditProfileData(int id, PersonalData newProfile);
    }
}
