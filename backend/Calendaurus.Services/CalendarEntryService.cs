using Calendaurus.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace Calendaurus.Services
{
    public class CalendarEntryService : ICalendarEntryService
    {
        private readonly CalendaurusContext _context;

        public CalendarEntryService(CalendaurusContext context)
        {
            _context = context;
        }

        public async Task<CalendarEntry> CreateCalendarEntry(string title, DateTime timestamp, short type, string location, Guid userId)
        {
            var entry = new CalendarEntry
            {
                Id = Guid.NewGuid(),
                Title = title,
                Timestamp = timestamp,
                Type = type,
                Location = location,
                UserId = userId
            };

            _context.Add(entry);
            await _context.SaveChangesAsync();

            return entry;
        }

        public async Task DeleteCalendarEntry(Guid id, Guid userId)
        {
            var entry = await _context.CalendarEntries.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (entry != null)
            {
                _context.Remove(entry);
                await _context.SaveChangesAsync();
            };
        }

        public async Task<CalendarEntry?> UpdateCalendarEntry(Guid id, string title, DateTime timestamp, short type, string location, Guid userId)
        {
            var entry = await _context.CalendarEntries.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (entry != null)
            {
                entry.Title = title;
                entry.Timestamp = timestamp;
                entry.Type = type;
                entry.Location = location;

                await _context.SaveChangesAsync();
            };

            return entry;
        }
    }
}
