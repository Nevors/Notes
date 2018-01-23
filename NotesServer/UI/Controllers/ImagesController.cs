using Domain.Entity;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web;
using UI.Models;
using System.Net.Http.Headers;

namespace UI.Controllers {
    [RoutePrefix("api/Images")]
    public class ImagesController : ApiController {
        ApplicationDbContext db = ApplicationDbContext.Create();

        string pathFolderImage = "~/Content/Images/";
        [Route("List")]
        public IHttpActionResult GetList() {
            string userId = User.Identity.GetUserId();
            var list = db.Images
                    .Where(i => String.Equals(userId, i.UserId))
                    .Select(i => i.Id)
                    ;
            return Json(list);
        }

        public HttpResponseMessage GetItem(int id) {
            Image image = db.Images.Find(id);

            if (image == null) {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.NotFound };
            }
            string serverPath = HttpContext.Current.Server.MapPath(pathFolderImage + image.Path);

            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            var stream = new FileStream(serverPath, FileMode.Open, FileAccess.Read);
            result.Content = new StreamContent(stream);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue(image.Type);
            result.Headers.Add("Cache-Control", "public, max-age=31536000");
            return result;
        }

        Regex reg = new Regex("^image/.+");

        public async Task<IHttpActionResult> PostCreate() {

            if (!Request.Content.IsMimeMultipartContent()) {
                return BadRequest();
            }
            var result = new List<Image>();
            var provider = new MultipartMemoryStreamProvider();
            MultipartStreamProvider files;
            try {
                files = await Request.Content.ReadAsMultipartAsync();
            } catch {
                return BadRequest();
            }
            string userId = User.Identity.GetUserId();

            string serverPath = HttpContext.Current.Server.MapPath(pathFolderImage);

            foreach (var file in files.Contents) {
                string contentType = file.Headers.ContentType.MediaType;
                if (reg.IsMatch(contentType)) {

                    int countImage = db.Images.Count();

                    byte[] bytesImage = await file.ReadAsByteArrayAsync();

                    string fileName = file.Headers.ContentDisposition.FileName;
                    fileName = fileName.Substring(1, fileName.Length - 2);
                    string type = fileName.Substring(fileName.LastIndexOf('.'));
                    fileName = countImage + type;

                    using (FileStream fs = new FileStream(serverPath + fileName, FileMode.Create)) {
                        await fs.WriteAsync(bytesImage, 0, bytesImage.Length);
                    }

                    Image image = new Image { UserId = userId, Path = fileName, Type = contentType };

                    image = db.Images.Add(image);

                    db.SaveChanges();

                    result.Add(image);
                }
            }

            return Json(result.Select(i=>i.Id));
        }

        public IHttpActionResult Delete(int id) {
            Image image = db.Images.Find(id);

            if (image == null) {
                return NotFound();
            }

            string serverPath = HttpContext.Current.Server.MapPath(pathFolderImage + image.Path);
            FileInfo file = new FileInfo(serverPath);
            file.Delete();
            db.Images.Remove(image);
            db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
