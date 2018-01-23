using Domain.Entity;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UI.Models;

namespace UI.Controllers {
    //[Authorize]
    [RoutePrefix("api/Notes")]
    public class NotesController : ApiController {
        ApplicationDbContext db = ApplicationDbContext.Create();

        [Route("ListEx")]
        public IHttpActionResult GetListEx() {
            string userId = User.Identity.GetUserId();
            var list = db.AccessCards
                .Include(ac => ac.Note)
                .Where(ac => ac.UserId == userId)
                .Select(ac => ac.Note);
            return Json(list);
        }

        [Route("List/{parentId}")]
        public IHttpActionResult GetList(int? parentId) {
            if (parentId == 0) parentId = null;
            string userId = User.Identity.GetUserId();
            var list = GetNotes(parentId)
                .Where(n => n.CreatorId.Equals(userId))
                .ToList()
                .Select(n => GetFormatNote(n));
            return Json(list);
        }

        public IHttpActionResult GetItem(int? id) {
            string userId = User.Identity.GetUserId();
            var note = db.Notes.Find(id);
            if (note != null && IsAccessReadNote(note, userId)) {
                return Json(GetFormatNote(note));
            }
            return NotFound();
        }

        public IHttpActionResult PutEdit([FromBody]Note note) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            string userId = User.Identity.GetUserId();
            Note noteDb = db.Notes.Find(note.Id);

            if (noteDb == null) {
                return BadRequest("Not found note");
            }

            bool isCreator = noteDb.CreatorId.Equals(userId);

            if (isCreator || IsAccess(note, userId, Access.ReadWrite)) {
                noteDb.Text = note.Text;
                noteDb.Title = note.Title;
            }

            if (isCreator) {
                noteDb.ParentId = note.ParentId;
            }

            db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        public IHttpActionResult PostCreate([FromBody]Note note) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }
            string userId = User.Identity.GetUserId();
            note.CreatorId = userId;

            Note res = db.Notes.Add(note);
            db.SaveChanges();
            return Json(GetFormatNote(res));
        }

        public IHttpActionResult Delete(int id) {
            string userId = User.Identity.GetUserId();
            var note = db.Notes.FirstOrDefault(n => n.Id == id && n.CreatorId.Equals(userId));
            if (note == null) {
                return NotFound();
            }
            db.Notes.Remove(note);
            db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }


        private bool IsAccessReadNote(Note note, string userId) {
            return note.CreatorId.Equals(userId) || IsAccess(note, userId, Access.Read);
        }

        private Access GetAccessWrite(Note note, string userId) {
            db.Entry(note).Collection(i => i.AccessCards).Load();
            return note.AccessCards.FirstOrDefault(p => p.UserId.Equals(userId))?.Access ?? 0;
        }

        /// <summary>
        /// Check only AccessCard
        /// </summary>
        private bool IsAccess(Note note, string userId, Access access) {
            return (GetAccessWrite(note, userId) & access) == access;
        }

        protected override void Dispose(bool disposing) {
            if (disposing) {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private IQueryable<Note> GetNotes(int? parentId) {
            return db.Notes.Where(n => n.ParentId == parentId);
        }

        private bool IsHaveChildren(int? parentId) {
            return GetNotes(parentId).ToList().Any();
        }

        private dynamic GetFormatNote(Note note) {
            return new {
                Id = note.Id,
                ParentId = note.ParentId,
                Title = note.Title,
                Text = note.Text,
                IsHaveChildren = IsHaveChildren(note.Id)
            };
        }

        //private IHttpActionResult Save(Note note) {
        //    string userId = User.Identity.GetUserId();
        //    if (note.Id == 0) {
        //        note.CreatorId = userId;

        //        if (!ModelState.IsValid) {
        //            return BadRequest(ModelState);
        //        }

        //        Note res = db.Notes.Add(note);
        //        db.SaveChanges();
        //        return Ok(new { Id = res.Id });
        //    }

        //    if (!ModelState.IsValid) {
        //        return BadRequest(ModelState);
        //    }

        //    Note noteDb = db.Notes.Find(note.Id);
        //    if (noteDb == null) {
        //        return BadRequest("Not found note");
        //    }

        //    bool isCreator = note.CreatorId.Equals(userId);

        //    if (isCreator || IsAccesWrite(note, userId)) {
        //        note.Text = noteDb.Text;
        //    }

        //    if (isCreator) {
        //        noteDb.ParentId = note.ParentId;
        //        noteDb.IsFavorite = note.IsFavorite;
        //        noteDb.AccessCarts = note.AccessCarts;
        //    }

        //    db.SaveChanges();
        //    return Ok();
        //}
    }
}
