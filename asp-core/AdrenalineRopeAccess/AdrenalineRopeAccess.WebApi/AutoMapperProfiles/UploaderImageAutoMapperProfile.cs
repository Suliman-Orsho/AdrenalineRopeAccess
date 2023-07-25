using AdrenalineRopeAccess.Dtos.Uploaders;
using AdrenalineRopeAccess.Entities.Employees;
using AdrenalineRopeAccess.Entities.Equipments;
using AutoMapper;

namespace AdrenalineRopeAccess.WebApi.AutoMapperProfiles
{
    public class UploaderImageAutoMapperProfile : Profile
    {
        public UploaderImageAutoMapperProfile()
        {
            CreateMap<UploaderImageDto, EmployeeImage>().ReverseMap();
            CreateMap<UploaderImageDto, EquipmentImage>().ReverseMap();
        }
    }
}
