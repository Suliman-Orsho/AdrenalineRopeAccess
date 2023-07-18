using AdrenalineRopeAccess.Dtos.Projects;
using AdrenalineRopeAccess.Entities;
using AutoMapper;

namespace AdrenalineRopeAccess.WebApi.AutoMapperProfiles
{
    public class ProjectAutoMapperProfile : Profile
    {
        public ProjectAutoMapperProfile()
        {
            CreateMap<Project,ProjectListDto>();
            CreateMap<Project, ProjectDetailsDto>();
            CreateMap<ProjectDto,Project>();

            CreateMap<Project, ProjectDto>()
                .ForMember(dest => dest.EmployeeIds, opts => opts.MapFrom(src => src.Employees.Select(p => p.Id)));
             // .ForMember(dest => dest.EquipmentIds, opts => opts.MapFrom(src => src.Equipments.Select(p => p.Id)))

        }
    }
}
