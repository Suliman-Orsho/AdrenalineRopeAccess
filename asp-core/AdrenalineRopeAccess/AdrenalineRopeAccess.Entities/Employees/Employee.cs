using AdrenalineRopeAccess.Utils.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdrenalineRopeAccess.Entities.Employees
{
    public class Employee
    {
        public Employee()
        {
            Advances = new List<Advance>();
            Projects = new List<Project>();
            Images = new List<EmployeeImage>();
        }

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
        public List<Advance> Advances { get; set; }

        public List<Project> Projects { get; set; }

        public List<EmployeeImage> Images { get; set; }


        [NotMapped]
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }

        [NotMapped]
        public double TotalAdvances
        {
            get
            {
                return Advances.Select(x => x.Amount).Sum();
            }
        }


        [NotMapped]
        public int Age
        {
            get
            {
                return DateTime.Now.Year - DOB.Year;
            }
        }
    }
}
