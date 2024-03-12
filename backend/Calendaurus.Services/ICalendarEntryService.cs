using Calendaurus.Models.Models;

namespace Calendaurus.Services
{
    public interface ICalendarEntryService
    {
        Task<CalendarEntry> CreateCalendarEntry(string title, DateTime timestamp, short type, string location, Guid userId);
        Task<CalendarEntry?> UpdateCalendarEntry(Guid id, string title, DateTime timestamp, short type, string location, Guid userId);
        Task DeleteCalendarEntry(Guid id, Guid userId);
    }
}
