using AdrenalineRopeAccess.Utils.Enums;

namespace AdrenalineRopeAccess.Dtos.Projects
{
    public class ProjectDto
    {
        public ProjectDto()
        {
            EmployeeIds = new List<int>();
            EquipmentIds = new List<int>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public Work Work { get; set; }
        public int Income { get; set; }
        public bool IsPaid { get; set; }
        public int Spending { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? FinishDate { get; set; }
        public string ClientNumber { get; set; }
        public int LinesCount { get; set; }

        public List<int> EmployeeIds { get; set; }
        public List<int> EquipmentIds { get; set; }
    }
}
