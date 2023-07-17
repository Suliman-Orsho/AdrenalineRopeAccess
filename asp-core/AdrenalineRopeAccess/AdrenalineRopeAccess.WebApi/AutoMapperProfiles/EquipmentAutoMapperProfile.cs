using AdrenalineRopeAccess.Dtos.Equipments;
using AdrenalineRopeAccess.Entities;
using AutoMapper;

namespace AdrenalineRopeAccess.WebApi.AutoMapperProfiles
{
    public class EquipmentAutoMapperProfile : Profile
    {
        public EquipmentAutoMapperProfile()
        {
            CreateMap<Equipment,EquipmentDto>().ReverseMap();
            CreateMap<Equipment,EquipmentInfoDto>();
        }
    }
}
