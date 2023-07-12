using AdrenalineRopeAccess.Utils.Enums;

namespace AdrenalineRopeAccess.Entities
{
    public class Project
    {
        public Project()
        {
            Employees = new List<Employee>();
           // Equipments = new List<Equipment>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public Work Work { get; set; }
        public int Income { get; set; }
        public bool IsPaid { get; set; }
        public int OutGoings { get; set; }
        public DateTime DateOfWork { get; set; }
        public string MobileNumber { get; set; }
        public int NumberOfLines { get; set; }
        public List<Employee> Employees { get; set; }
       // public List<Equipment> Equipments { get; set; }
    }
}
