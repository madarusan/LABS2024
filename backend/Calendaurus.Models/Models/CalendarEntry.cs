

using System.ComponentModel.DataAnnotations;

namespace Calendaurus.Models.Models
{
    public class CalendarEntry
    {
        [Key]
        public Guid Id { get; set; }
        [StringLength(200)]
        public string Title { get; set; } = default!;
        public DateTime Timestamp { get; set; }
        [StringLength(200)]
        public string Location { get; set; } = default!;
        public short Type { get; set; }
        public Guid UserId { get; set; }
        public virtual User? User { get; set; }
    }
}
