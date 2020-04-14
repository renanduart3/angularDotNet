using Agil.API.DTOS;
using Agil.Domain.Identity;
using AutoMapper;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<User, UserDTO>().ReverseMap();

        CreateMap<User, UserLoginDTO>().ReverseMap();
    }
}