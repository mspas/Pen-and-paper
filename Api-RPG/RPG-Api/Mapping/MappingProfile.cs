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
            //CreateMap<Account, AccountResource>();
            CreateMap<Account, AccountResource>()
                .ForMember(u => u.Roles, opt => opt.MapFrom(u => u.UserRoles.Select(ur => ur.Role.Name)));
            CreateMap<AccountCredentialsResource, Account>();
            CreateMap<PersonalData, PersonalDataResource>();
            CreateMap<PersonalDataCredentialsResource, PersonalData>();
            CreateMap<Friend, FriendResource>();
            CreateMap<Game, GameResource>();
            CreateMap<GameToPerson, GameToPersonResource>();
            CreateMap<Forum, ForumResource>();
            CreateMap<Skill, SkillResource>();
            CreateMap<MySkill, MySkillResource>();
        }
    }
}
