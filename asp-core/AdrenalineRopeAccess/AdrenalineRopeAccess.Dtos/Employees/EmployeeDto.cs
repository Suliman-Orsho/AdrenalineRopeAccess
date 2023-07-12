using AdrenalineRopeAccess.Utils.Enums;

namespace AdrenalineRopeAccess.Dtos.Employees
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Gender Gender { get; set; }
        public DateTime DOB { get; set; }
        public int IrataLevel { get; set; }
        public Address Address { get; set; }
        public double Salary { get; set; }
        public Nationality Nationality { get; set; }
        public string MobileNumber { get; set; }
        public Rank Rank { get; set; }
    }
}
