using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string login { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public virtual PersonalData PersonalData { get; set; }

        public Account()
        {
            PersonalData = new PersonalData();
        }
    }
}
