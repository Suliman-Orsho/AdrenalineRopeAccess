using AdrenalineRopeAccess.Utils.Enums;

namespace AdrenalineRopeAccess.Dtos.Projects
{
    public class ProjectListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Work Work { get; set; }
        public int Income { get; set; }
        public bool IsPaid { get; set; }
        public int Spending { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? FinishDate { get; set; }               
    }
}
