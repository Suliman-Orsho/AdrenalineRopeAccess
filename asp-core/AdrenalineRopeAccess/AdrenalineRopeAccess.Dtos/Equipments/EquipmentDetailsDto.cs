using AdrenalineRopeAccess.Dtos.Uploaders;

namespace AdrenalineRopeAccess.Dtos.Equipments
{
    public class EquipmentDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime EntryDate { get; set; }
        public string ProjectName { get; set; }
        public int ProjectId { get; set; }
        public List<UploaderImageDto> Images { get; set; }

    }
}
