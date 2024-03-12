using AutoMapper;
using Calendaurus.Models.Models;

namespace Calendaurus.API.Models
{
    public class CalendaurusProfile : Profile
    {
        public CalendaurusProfile()
        {
            CreateMap<CalendarEntry, CalendarEntryApiModel>();
            CreateMap<CalendarEntryApiModel, CalendarEntry>();
        }
    }
}
