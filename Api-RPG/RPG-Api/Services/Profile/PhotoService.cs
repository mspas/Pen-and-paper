using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using RPG.Api.Domain.Services.Profile;
using RPG.Api.Domain.Repositories.Profile;
using System.IO;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;

namespace RPG.Api.Services.Profile
{
    public class PhotoService : IPhotoService
    {
        private readonly IPersonalDataRepository _personalDataRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHostingEnvironment _host;

        public PhotoService(IPersonalDataRepository personalDataRepository, IUnitOfWork unitOfWork, IHostingEnvironment host)
        {
            _personalDataRepository = personalDataRepository;
            _unitOfWork = unitOfWork;
            _host = host;
        }

        public async Task<BaseResponse> UploadPhotoAsync(int pdataId, IFormFile file)
        {
            var profile = await _personalDataRepository.GetProfile(pdataId);

            if (profile == null)
                return new BaseResponse(false, "Account not found.");

            var uploadFolderPath = Path.Combine(_host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadFolderPath))
                Directory.CreateDirectory(uploadFolderPath);

            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photo = new Photo { FileName = fileName };

            profile.ProfilePhoto = photo;
            profile.photoName = fileName;
            profile.isPhotoUploaded = true;

            var response = await _personalDataRepository.UpdateProfile(profile);

            await _unitOfWork.CompleteAsync();

            return new BaseResponse(true, null);
        }
        
        public async Task<BaseResponse> DeletePhotoAsync(int userId, string fileName)
        {
            var profile = await _personalDataRepository.GetProfile(userId);

            //  DEFINITELY TODO SOON //

            throw new NotImplementedException();
        }
        
        public string GetMimeType(string fileName)
        {
            string extension = Path.GetExtension(fileName).ToLowerInvariant();
            switch (extension)
            {
                case ".txt": return "text/plain";
                case ".pdf": return "application/pdf";
                case ".doc": return "application/vnd.ms-word";
                case ".docx": return "application/vnd.ms-word";
                case ".xls": return "application/vnd.ms-excel";
                case ".png": return "image/png";
                case ".jpg": return "image/jpeg";
                case ".jpeg": return "image/jpeg";
                case ".gif": return "image/gif";
                case ".csv": return "text/csv";
                default: return "";
            }
        }
    }
}
