using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mdRPG.Models;

namespace mdRPG.Controllers.Resources
{
    public class PersonalDataResource
    {
        public int Id { get; set; }
        public string login { get; set; }
        public string email { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string city { get; set; }
        public int age { get; set; }
        public string photoName { get; set; }
    }
}
