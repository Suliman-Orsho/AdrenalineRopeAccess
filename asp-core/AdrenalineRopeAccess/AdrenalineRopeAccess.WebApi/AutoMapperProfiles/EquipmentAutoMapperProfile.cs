using AdrenalineRopeAccess.Dtos.Equipments;
using AdrenalineRopeAccess.Entities.Equipments;
using AutoMapper;

namespace AdrenalineRopeAccess.WebApi.AutoMapperProfiles
{
    public class EquipmentAutoMapperProfile : Profile
    {
        public EquipmentAutoMapperProfile()
        {
            CreateMap<Equipment,EquipmentDto>().ReverseMap();
            CreateMap<Equipment,EquipmentInfoDto>();
            CreateMap<Equipment,EquipmentListDto>();
            CreateMap<Equipment,EquipmentDetailsDto>();
        }
    }
}
