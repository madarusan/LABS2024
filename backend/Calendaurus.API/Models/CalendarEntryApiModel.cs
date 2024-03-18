using Calendaurus.Models.Models;

namespace Calendaurus.API.Models
{
    public class CalendarEntryApiModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = default!;
        public DateTime Timestamp { get; set; }
        public string Location { get; set; } = default!;
        public short Type { get; set; }
    }
}
