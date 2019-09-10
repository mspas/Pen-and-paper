using RPG.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.Communication
{
    public class CreateAccountResponse : BaseResponse
    {
        public Account Account { get; private set; }

        public CreateAccountResponse(bool success, string message, Account account) : base(success, message)
        {
            Account = account;
        }
    }
}
