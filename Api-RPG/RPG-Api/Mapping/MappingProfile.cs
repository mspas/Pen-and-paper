using AutoMapper;
using RPG.Api.Resources;
using RPG.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Account, AccountResource>();
            CreateMap<PersonalData, PersonalDataResource>();
        }
    }
}
