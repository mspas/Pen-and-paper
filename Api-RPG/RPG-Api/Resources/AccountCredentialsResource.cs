using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Resources
{
    public class AccountCredentialsResource
    {

        [Required]
        public string login { get; set; }

        [Required]
        public string password { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [StringLength(255)]
        public string email { get; set; }
        public virtual PersonalDataCredentialsResource PersonalData { get; set; }

        public AccountCredentialsResource()
        {
            PersonalData = new PersonalDataCredentialsResource();
        }
    }
}
