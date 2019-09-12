using System.ComponentModel.DataAnnotations.Schema;

namespace RPG.Api.Domain.Models.Profile
{
    public class RefreshToken1
    {
        [ForeignKey("Account")]
        public int Id { set; get; }
        public string Token { set; get; }
        public long Expiration { set; get; }

    }
}
