using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services
{
    public interface IPhotoService
    {
        Task<BaseResponse> UploadPhoto(int pdataId, IFormFile file);
        Task<BaseResponse> DeletePhoto(int userId, string fileName);
        string GetMimeType(string fileName);
    }
}
