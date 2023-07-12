using AdrenalineRopeAccess.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdrenalineRopeAccess.EfCore
{
    public class AdrenalineDbContext : DbContext
    {
        public AdrenalineDbContext(DbContextOptions<AdrenalineDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Advance> Advances { get; set; }
        public DbSet<Equipment> Equipments { get; set; }



    }
}
