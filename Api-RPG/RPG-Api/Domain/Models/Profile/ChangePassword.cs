using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Models
{
    public class ChangePassword
    {
        public string oldpass { get; set; }
        public string newpass { get; set; }
    }
}
