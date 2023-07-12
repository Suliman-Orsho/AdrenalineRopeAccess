using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace AdrenalineRopeAccess.EfCore
{
    public class AdrenalineDbContextFactory : IDesignTimeDbContextFactory<AdrenalineDbContext>
    {
        public AdrenalineDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AdrenalineDbContext>();
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=AdrenalineRopeAccess;Trusted_Connection=True;MultipleActiveResultSets=true");

            return new AdrenalineDbContext(optionsBuilder.Options);
        }
    }
}
