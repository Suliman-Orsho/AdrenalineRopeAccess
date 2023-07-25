using AdrenalineRopeAccess.Entities;
using AdrenalineRopeAccess.Entities.Employees;
using AdrenalineRopeAccess.Entities.Equipments;
using Microsoft.EntityFrameworkCore;

namespace AdrenalineRopeAccess.EfCore
{
    public class AdrenalineDbContext : DbContext
    {
        public AdrenalineDbContext(DbContextOptions<AdrenalineDbContext> options) : base(options)
        {
        }

        public DbSet<UploaderImage> UploaderImages { get; set; }
        public DbSet<EmployeeImage> EmployeeImages { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Advance> Advances { get; set; }
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<EquipmentImage> EquipmentImages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UploaderImage>().UseTpcMappingStrategy()
                .ToTable("UploaderImages");

            modelBuilder.Entity<EmployeeImage>()
                .ToTable("EmployeeImages");

            modelBuilder.Entity<EquipmentImage>()
                .ToTable("EquipmentImages");
        }

    }
}
