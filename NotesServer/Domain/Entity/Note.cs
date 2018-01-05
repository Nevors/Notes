using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity {
    public class Note {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Title { get; set; }

        public string Text { get; set; }

        public int? ParentId { get; set; }
        public Note Parent { get; set; }

        [StringLength(255)]
        public string CreatorId { get; set; }

        public ICollection<AccessCard> AccessCards { get; set; }
    }
}
