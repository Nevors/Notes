using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using UI.Models;
using Domain.Entity;
using System.IO;

namespace UI.Controllers {
    public class HomeController : Controller {
        ApplicationDbContext db = ApplicationDbContext.Create();

        public ActionResult Index() {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
