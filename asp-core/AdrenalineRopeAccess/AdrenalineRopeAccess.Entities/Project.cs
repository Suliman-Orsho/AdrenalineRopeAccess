using AdrenalineRopeAccess.Entities.Employees;
using AdrenalineRopeAccess.Entities.Equipments;
using AdrenalineRopeAccess.Utils.Enums;

namespace AdrenalineRopeAccess.Entities
{
    public class Project
    {
        public Project()
        {
            Employees = new List<Employee>();
            Equipments = new List<Equipment>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public Work Work { get; set; }
        public int Income { get; set; }
        public bool IsPaid { get; set; }
        public int? Spending { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? FinishDate { get; set; }
        public string ClientNumber { get; set; }
        public int LinesCount { get; set; }
        public List<Employee> Employees { get; set; }
        public List<Equipment> Equipments { get; set; }
    }
}
