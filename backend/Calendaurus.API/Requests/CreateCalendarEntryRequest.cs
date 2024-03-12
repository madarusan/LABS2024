﻿namespace Calendaurus.API.Requests
{
    public class CreateCalendarEntryRequest
    {
        public string Title { get; set; } = default!;
        public DateTime Timestamp { get; set; }
        public string Location { get; set; } = default!;
        public short Type { get; set; }
    }
}
