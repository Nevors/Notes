using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity {
    public class Image {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Path { get; set; }

        [Required]
        [StringLength(255)]
        public string Type { get; set; }

        [StringLength(255)]
        public string UserId { get; set; }
    }
}
