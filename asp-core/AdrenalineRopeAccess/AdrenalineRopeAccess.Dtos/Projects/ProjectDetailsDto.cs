using AdrenalineRopeAccess.Dtos.Employees;
using AdrenalineRopeAccess.Dtos.Equipments;
using AdrenalineRopeAccess.Utils.Enums;

namespace AdrenalineRopeAccess.Dtos.Projects
{
    public class ProjectDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Work Work { get; set; }
        public int Income { get; set; }
        public bool IsPaid { get; set; }
        public int Spending { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public string ClientNumber { get; set; }
        public int LinesCount { get; set; }

        public List<EmployeeInfoDto> Employees { get; set; }
        public List<EquipmentInfoDto> Equipments { get; set; }
    }
}
