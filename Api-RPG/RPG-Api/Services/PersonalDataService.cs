using Microsoft.AspNetCore.Mvc;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Services;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace RPG.Api.Services
{
    public class PersonalDataService : IPersonalDataService
    {
        private readonly IPersonalDataRepository _personalDataRepository;
        private readonly IUnitOfWork _unitOfWork;

        public PersonalDataService(IPersonalDataRepository personalDataRepository, IUnitOfWork unitOfWork)
        {
            _personalDataRepository = personalDataRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<List<PersonalData>> FindProfiles(string data)
        {
            var foundData = new List<PersonalData>();
            var profile = await GetProfile(data);

            if (profile != null)
            {
                foundData.Add(profile);
                return foundData;
            }

            var padataList = await _personalDataRepository.GetList();
            var pattern = "";
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

            foreach (PersonalData p in padataList)
            {
                var nextData = p.firstname + "." + p.lastname + "." + p.login;
                if (rgx.IsMatch(nextData))
                {
                    foundData.Add(p);
                }
            }
            return foundData;
        }

        public async Task<BaseResponse> EditProfileData(int id, PersonalData newProfile)
        {
            var oldProfile= _personalDataRepository.GetProfile(id).Result;
            var toUpdateProfile = UpdateDataProfile(newProfile, oldProfile);
            var response = await _personalDataRepository.UpdateProfile(toUpdateProfile);

            await _unitOfWork.CompleteAsync();

            return response;
        }

        public async Task<PersonalData> GetProfile(string login)
        {
            return await _personalDataRepository.GetProfile(login);
        }

        public Task<PersonalData> GetProfile(int id)
        {
            return _personalDataRepository.GetProfile(id);
        }


        public PersonalData UpdateDataProfile(PersonalData newProfile, PersonalData profileToUpdate)
        {
            profileToUpdate.firstname = newProfile.firstname;
            profileToUpdate.lastname = newProfile.lastname;
            profileToUpdate.email = newProfile.email;
            profileToUpdate.age = newProfile.age;
            profileToUpdate.city = newProfile.city;

            return profileToUpdate;
        }
    }
}
