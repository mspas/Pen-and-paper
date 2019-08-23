using AutoMapper;
using mdRPG.Controllers.Resources;
using mdRPG.Models;
using mdRPG.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace mdRPG.Controllers
{
    [Route("/api/pdata/{pdataId}/photos")]
    public class PhotoController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly List<Account> allAccounts;
        private readonly List<PersonalDataResource> per = new List<PersonalDataResource>();
        private readonly RpgDbContext context;
        private readonly IMapper mapper;

        public PhotoController(RpgDbContext context, IHostingEnvironment host)
        {
            this.host = host;
            this.context = context;
            this.mapper = mapper;
            allAccounts = context.Accounts.Include(mbox => mbox.PersonalData).ToList();
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int pdataId, IFormFile file)
        {
            Account foundAccount = null;

            foreach (Account acc in allAccounts)
            {
                if (acc.Id == pdataId)
                    foundAccount = acc;
            }

            if (foundAccount == null)
                return NotFound();

            var uploadFolderPath = Path.Combine(host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadFolderPath))
                Directory.CreateDirectory(uploadFolderPath);

            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photo = new Photo { FileName = fileName };

            foundAccount.PersonalData.ProfilePhoto = photo;
            foundAccount.PersonalData.photoName = fileName;
            foundAccount.PersonalData.isPhotoUploaded = true;

            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("/api/photos/{filename}")]
        public async Task<IActionResult> DownloadFile(string filename)
        {
            try
            {
                string filePath = Path.Combine(Path.Combine(host.WebRootPath, "uploads"), filename);

                var memory = new MemoryStream();
                using (var stream = new FileStream(filePath, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }

                memory.Position = 0;
                return File(memory, GetMimeType(filePath), filename);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        private static string AssemblyDirectory
        {
            get
            {
                string codeBase = Assembly.GetExecutingAssembly().CodeBase;
                UriBuilder uri = new UriBuilder(codeBase);
                string path = Uri.UnescapeDataString(uri.Path);
                return Path.GetDirectoryName(path);
            }
        }

        private string GetMimeType(string file)
        {
            string extension = Path.GetExtension(file).ToLowerInvariant();
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
