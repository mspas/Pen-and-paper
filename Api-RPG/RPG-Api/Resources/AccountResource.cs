using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Resources
{
    public class AccountResource
    {
        public int Id { get; set; }
        public string login { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public virtual PersonalDataResource PersonalData { get; set; }

        public AccountResource()
        {
            PersonalData = new PersonalDataResource();
        }
    }
}
