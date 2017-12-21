using Domain.Entity;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using UI.Models;

namespace UI.Controllers {
    [RoutePrefix("api/Images")]
    public class ImagesController : Controller {
        string pathFolderImage = "~/Content/Images/";

        ApplicationDbContext db = ApplicationDbContext.Create();

        Regex reg = new Regex("^image/.+");

        [Route("Create")]
        [HttpPost]
        public JsonResult Create() {
            int countLoadFile= 0;
            foreach (string file in Request.Files) {
                var upload = Request.Files[file];
                if (upload != null && reg.IsMatch(upload.ContentType)) {
                    string userId = User.Identity.GetUserId();
                    int countImage = db.Images.Count();

                    string fileName = upload.FileName;
                    string type = fileName.Substring(fileName.LastIndexOf('.'));
                    fileName = countImage + type;

                    string serverPath = Server.MapPath(pathFolderImage + fileName);
                    upload.SaveAs(serverPath);

                    Image image = new Image { UserId = userId, Path = fileName, Type = upload.ContentType };

                    db.Images.Add(image);

                    db.SaveChanges();
                    countLoadFile++;
                }
            }
            return Json(countLoadFile);
        }
        //TODO: Добавить проверку доступа
        [Route("Item/{id}")]
        [HttpGet]
        public ActionResult Item(int id) {
            Image image = db.Images.Find(id);

            if (image == null) {
                Response.StatusCode = 404;
                //return Json("Not found image", JsonRequestBehavior.AllowGet);
                return null;
            }
            string serverPath = Server.MapPath(pathFolderImage + image.Path);

            return File(serverPath, image.Type, image.Path);
        }

        //TODO: Добавить проверку доступа
        [Route("Delete/{id}")]
        [HttpPost]
        public ActionResult Delete(int id) {
            Image image = db.Images.Find(id);

            if (image == null) {
                Response.StatusCode = 404;
                return null;
            }

            string serverPath = Server.MapPath(pathFolderImage + image.Path);
            FileInfo file = new FileInfo(serverPath);
            file.Delete();
            db.Images.Remove(image);

            Response.StatusCode = 204;
            return null;
        }
    }
}
