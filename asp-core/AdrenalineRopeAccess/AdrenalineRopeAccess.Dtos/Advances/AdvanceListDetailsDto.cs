using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdrenalineRopeAccess.Dtos.Advances
{
    public class AdvanceListDetailsDto
    {
        public int Id { get; set; }
        public string EmployeeFullName { get; set; }
        public double Amount { get; set; }
        public DateTime AdvanceDate { get; set; }
    }
}
