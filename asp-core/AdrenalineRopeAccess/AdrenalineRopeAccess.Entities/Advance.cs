namespace AdrenalineRopeAccess.Entities
{
    public class Advance
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public double Amount { get; set; }
        public DateTime AdvanceDate { get; set; }
    }
}
