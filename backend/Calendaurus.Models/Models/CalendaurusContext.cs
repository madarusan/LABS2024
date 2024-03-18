using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Calendaurus.Models.Models;

public partial class CalendaurusContext : DbContext
{
    public CalendaurusContext()
    {
    }

    public CalendaurusContext(DbContextOptions<CalendaurusContext> options)
        : base(options)
    {
    }


    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<CalendarEntry> CalendarEntries { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=localhost;Database=Calendaurus;Trusted_Connection=True;Encrypt=false;");
}
