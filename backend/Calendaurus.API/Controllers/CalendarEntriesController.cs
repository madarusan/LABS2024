using AutoMapper;
using Calendaurus.API.Models;
using Calendaurus.API.Requests;
using Calendaurus.Models.Models;
using Calendaurus.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Calendaurus.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/calendar/entries")]
    public class CalendarEntriesController : ControllerBase
    {
        private readonly CalendaurusContext _context;
        private readonly IMapper _mapper;
        private readonly ICalendarEntryService _calendarEntryService;

        public CalendarEntriesController(CalendaurusContext context, IMapper mapper, ICalendarEntryService calendarEntryService)
        {
            _context = context;
            _mapper = mapper;
            _calendarEntryService = calendarEntryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCalendarEntries(DateTime fromDate, DateTime toDate)
        {
            if (fromDate == DateTime.MinValue || toDate == DateTime.MinValue)
            {
                return BadRequest();
            }

            var currentUser = await GetCurrentUser();
            var calendarEntries = await _context.CalendarEntries.Where(e => e.Timestamp >= fromDate && e.Timestamp <= toDate && e.UserId == currentUser.Id).ToListAsync();
            var results = calendarEntries.Select(c => _mapper.Map<CalendarEntryApiModel>(c));
            return Ok(results);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCalendarEntry([FromBody] CreateCalendarEntryRequest request)
        {
            var currentUser = await GetCurrentUser();
            var calendarEntry = await _calendarEntryService.CreateCalendarEntry(request.Title, request.Timestamp, request.Type, request.Location, currentUser.Id);
            if (calendarEntry != null)
            {
                var result = _mapper.Map<CalendarEntryApiModel>(calendarEntry);
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCalendarEntry(Guid id, [FromBody] UpdateCalendarEntryRequest request)
        {
            var currentUser = await GetCurrentUser();
            var calendarEntry = await _calendarEntryService.UpdateCalendarEntry(id, request.Title, request.Timestamp, request.Type, request.Location, currentUser.Id);
            if (calendarEntry != null)
            {
                var result = _mapper.Map<CalendarEntryApiModel>(calendarEntry);
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCalendarEntry(Guid id)
        {
            var currentUser = await GetCurrentUser();
            await _calendarEntryService.DeleteCalendarEntry(id, currentUser.Id);
            return NoContent();
        }

        private async Task<User> GetCurrentUser()
        {
            var email = User.Identity!.Name;
            return await _context.Users.FirstAsync(u => u.Email == email);
        }
    }
}
