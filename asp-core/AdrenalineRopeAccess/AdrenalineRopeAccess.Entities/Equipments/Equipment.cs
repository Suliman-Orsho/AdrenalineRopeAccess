namespace AdrenalineRopeAccess.Entities.Equipments
{
    public class Equipment
    {
        public Equipment()
        {
            Images = new List<EquipmentImage>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime EntryDate { get; set; }
        public int? ProjectId { get; set; }
        public Project? Project { get; set; }
        public List<EquipmentImage> Images { get; set; }

        //public int Quantity { get; set; }
    }
}
