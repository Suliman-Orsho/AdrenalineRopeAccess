using AdrenalineRopeAccess.Dtos.Uploaders;

namespace AdrenalineRopeAccess.Dtos.Equipments
{
    public class EquipmentDto
    {
        public EquipmentDto()
        {
            Images = new List<UploaderImageDto>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime EntryDate { get; set; }
        public int? ProjectId { get; set; }
        public List<UploaderImageDto> Images { get; set; }

    }
}
