using AutoMapper;
using mdRPG.Controllers.Resources;
using mdRPG.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Mapping
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
