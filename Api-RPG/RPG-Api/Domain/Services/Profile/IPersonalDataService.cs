using Microsoft.AspNetCore.Mvc;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.Profile
{
    public interface IPersonalDataService
    {
        Task<PersonalData> GetProfileAsync(string login);
        Task<PersonalData> GetProfileAsync(int id);
        Task<List<PersonalData>> FindProfilesAsync(string data);
        Task<BaseResponse> EditProfileDataAsync(int id, PersonalData newProfile);
    }
}
