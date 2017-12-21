using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Domain.Entity;
using UI.Models;
using Microsoft.AspNet.Identity;

namespace UI.Controllers {
    [RoutePrefix("api/AccessCards")]
    [Authorize]
    public class AccessCardsController : ApiController {
        private ApplicationDbContext db = ApplicationDbContext.Create();

        [Route("List/{noteId}")]
        public IHttpActionResult GetAccessCards(int noteId) {
            Note note = db.Notes.Find(noteId);
            string userId = User.Identity.GetUserId();
            if (!userId.Equals(note.CreatorId)) {
                return NotFound();
            }
            return Ok(db.AccessCards.Where(i => i.NoteId == noteId));
        }

        [Route("Create")]
        public IHttpActionResult PostAccessCard(AccessCard accessCard) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }
            if (!isCreatorNote(accessCard)) {
                return BadRequest("Not found note");
            }
            db.AccessCards.Add(accessCard);
            db.SaveChanges();

            return Ok(accessCard);
        }

        [Route("Delete")]
        public IHttpActionResult PostAccessCard(int id) {
            AccessCard accessCard = db.AccessCards.Find(id);

            if (accessCard == null) {
                return NotFound();
            }

            if (!isCreatorNote(accessCard)) {
                return NotFound();
            }

            db.AccessCards.Remove(accessCard);
            db.SaveChanges();

            return Ok(accessCard);
        }

        protected override void Dispose(bool disposing) {
            if (disposing) {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        protected bool isCreatorNote(AccessCard card) {
            db.Entry(card).Reference(i => i.Note).Load();

            string creatorId = card.Note.CreatorId;
            string userId = User.Identity.GetUserId();

            return creatorId.Equals(userId);
        }
    }
}