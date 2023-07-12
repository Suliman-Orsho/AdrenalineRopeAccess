using AdrenalineRopeAccess.Dtos.Advances;
using AdrenalineRopeAccess.Entities;
using AutoMapper;

namespace AdrenalineRopeAccess.WebApi.AutoMapperProfiles
{
    public class AdvanceAutoMapperProfile : Profile
    {
        public AdvanceAutoMapperProfile()
        {
            CreateMap<Advance, AdvanceDto>().ReverseMap();
            CreateMap<Advance, AdvanceListDetailsDto>();
        }
    }
}
