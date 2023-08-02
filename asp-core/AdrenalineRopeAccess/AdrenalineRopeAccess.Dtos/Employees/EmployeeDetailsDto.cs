using AdrenalineRopeAccess.Dtos.Projects;
using AdrenalineRopeAccess.Dtos.Uploaders;
using AdrenalineRopeAccess.Utils.Enums;

namespace AdrenalineRopeAccess.Dtos.Employees
{
    public class EmployeeDetailsDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public Gender Gender { get; set; }
        public DateTime DOB { get; set; }
        public int IrataLevel { get; set; }
        public Address Address { get; set; }
        public double Salary { get; set; }
        public Nationality Nationality { get; set; }
        public string MobileNumber { get; set; }
        public Rank Rank { get; set; }
        public double TotalAdvances { get; set; }
        public int Age { get; set; }
        public List<UploaderImageDto> Images { get; set; }
        public List<ProjectListDto> Projects { get; set; }
    }
}
