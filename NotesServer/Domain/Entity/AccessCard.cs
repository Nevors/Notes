using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity {
    [Flags]
    public enum Access {
        Read = 1,
        ReadWrite = 3
    }

    public class AccessCard {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string UserId { get; set; }
        [Required]
        public Access Access { get; set; }
        [Required]
        public int NoteId { get; set; }
        public Note Note { get; set; }
    }
}