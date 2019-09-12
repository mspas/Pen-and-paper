using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Resources
{
    public class RefreshTokenResource
    {
        [Required]
        public string Token { get; set; }

        [Required]
        [StringLength(255)]
        public string Login { get; set; }
    }
}
