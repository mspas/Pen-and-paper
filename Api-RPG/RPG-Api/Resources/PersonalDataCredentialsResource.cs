using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Resources
{
    public class PersonalDataCredentialsResource
    {
        public string login { get; set; }
        public string email { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string city { get; set; }
        public int age { get; set; }
        public string photoName { get; set; }
        public bool isPhotoUploaded { get; set; }

        public PersonalDataCredentialsResource()
        {
            isPhotoUploaded = false;
        }
    }
}
