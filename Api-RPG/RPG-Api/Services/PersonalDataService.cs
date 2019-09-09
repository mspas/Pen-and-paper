using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Services;
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

        public PersonalDataService(IPersonalDataRepository personalDataRepository)
        {
            _personalDataRepository = personalDataRepository;
        }

        public List<PersonalData> FindProfiles(string data)
        {
            var foundData = new List<PersonalData>();
            var profile = GetProfile(data);

            if (profile != null)
            {
                foundData.Add(profile);
                return foundData;
            }

            var padataList = _personalDataRepository.GetList();
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

        public PersonalData GetProfile(string login)
        {
            return _personalDataRepository.GetProfile(login);
        }

        public PersonalData GetProfile(int id)
        {
            return _personalDataRepository.GetProfile(id);
        }
    }
}
