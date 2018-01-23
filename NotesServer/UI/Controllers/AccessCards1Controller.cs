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

namespace UI.Controllers
{
    public class AccessCards1Controller : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/AccessCards1
        public IQueryable<AccessCard> GetAccessCards()
        {
            return db.AccessCards;
        }

        // GET: api/AccessCards1/5
        [ResponseType(typeof(AccessCard))]
        public IHttpActionResult GetAccessCard(int id)
        {
            AccessCard accessCard = db.AccessCards.Find(id);
            if (accessCard == null)
            {
                return NotFound();
            }

            return Ok(accessCard);
        }

        // PUT: api/AccessCards1/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAccessCard(int id, AccessCard accessCard)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != accessCard.Id)
            {
                return BadRequest();
            }

            db.Entry(accessCard).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccessCardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/AccessCards1
        [ResponseType(typeof(AccessCard))]
        public IHttpActionResult PostAccessCard(AccessCard accessCard)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AccessCards.Add(accessCard);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = accessCard.Id }, accessCard);
        }

        // DELETE: api/AccessCards1/5
        [ResponseType(typeof(AccessCard))]
        public IHttpActionResult DeleteAccessCard(int id)
        {
            AccessCard accessCard = db.AccessCards.Find(id);
            if (accessCard == null)
            {
                return NotFound();
            }

            db.AccessCards.Remove(accessCard);
            db.SaveChanges();

            return Ok(accessCard);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccessCardExists(int id)
        {
            return db.AccessCards.Count(e => e.Id == id) > 0;
        }
    }
}