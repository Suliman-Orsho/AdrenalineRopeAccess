using AdrenalineRopeAccess.Dtos.Employees;
using AdrenalineRopeAccess.Entities;
using AutoMapper;

namespace AdrenalineRopeAccess.WebApi.AutoMapperProfiles
{
    public class EmployeeAutoMapperProfile : Profile
    {
        public EmployeeAutoMapperProfile()
        {
            CreateMap<Employee, EmployeeDto>().ReverseMap();
            CreateMap<Employee, EmployeeListDto>();
            CreateMap<Employee, EmployeeDetailsDto>();
            CreateMap<Employee, EmployeeInfoDto>();

        }
    }
}
