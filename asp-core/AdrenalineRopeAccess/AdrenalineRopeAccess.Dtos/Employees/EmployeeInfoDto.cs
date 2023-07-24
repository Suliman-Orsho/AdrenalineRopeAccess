using AdrenalineRopeAccess.Utils.Enums;

namespace AdrenalineRopeAccess.Dtos.Employees
{
    public class EmployeeInfoDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public Gender Gender { get; set; }
        public int Age { get; set; }
        public Rank Rank { get; set; }
        public int IrataLevel { get; set; }
        public Nationality Nationality { get; set; }
        public string MobileNumber { get; set; }

    }
}
