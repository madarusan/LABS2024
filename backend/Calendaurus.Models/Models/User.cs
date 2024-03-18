using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Calendaurus.Models.Models;

[Table("User")]
[Index("Email", Name = "UK_User_Email", IsUnique = true)]
public partial class User
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(100)]
    public string Email { get; set; } = null!;

    public virtual ICollection<CalendarEntry>? CalendarEntries { get; set; }

}
