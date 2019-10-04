using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using RPG.Api.Domain.Services;
using RPG.Api.Domain.Repositories.Profile;
using System.IO;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Repositories.RGame;

namespace RPG.Api.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly IPersonalDataRepository _personalDataRepository;
        private readonly IGameRepository _gameRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHostingEnvironment _host;

        public PhotoService(IPersonalDataRepository personalDataRepository, IGameRepository gameRepository, IUnitOfWork unitOfWork, IHostingEnvironment host)
        {
            _personalDataRepository = personalDataRepository;
            _gameRepository = gameRepository;
            _unitOfWork = unitOfWork;
            _host = host;
        }

        public async Task<BaseResponse> UploadPhotoAsync(bool profileOrGame, int id, bool isBgPhoto, IFormFile file)
        {
            var profile = new PersonalData();
            var game = new Game();
            if (profileOrGame)
            {
                profile = await _personalDataRepository.GetProfile(id);
                if (profile == null)
                    return new BaseResponse(false, "Account not found.");
            }
            else
            {
                game = await _gameRepository.GetGameAsync(id);
                if (game == null)
                    return new BaseResponse(false, "Game not found.");
            }

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

            if (profileOrGame)
            {
                if (isBgPhoto)
                {
                    profile.BackgroundPhoto = photo;
                    profile.bgPhotoName = fileName;
                }
                else
                {
                    profile.ProfilePhoto = photo;
                    profile.photoName = fileName;
                    profile.isPhotoUploaded = true;
                }

                var response = await _personalDataRepository.UpdateProfile(profile);
            }
            else
            {
                if (isBgPhoto)
                {
                    game.BackgroundPhoto = photo;
                    game.bgPhotoName = fileName;
                }
                else
                {
                    game.ProfilePhoto = photo;
                    game.photoName = fileName;
                }

                var response = _gameRepository.EditGame(game);

            }

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
