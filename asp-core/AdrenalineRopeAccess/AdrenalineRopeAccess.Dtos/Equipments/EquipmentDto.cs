namespace AdrenalineRopeAccess.Dtos.Equipments
{
    public class EquipmentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime EntryDate { get; set; }
        public int? ProjectId { get; set; }
    }
}
