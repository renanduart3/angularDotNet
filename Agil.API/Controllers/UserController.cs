using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Agil.API.DTOS;
using Agil.Domain.Identity;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Agil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public UserController(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet("getUsers")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(new UserDTO());
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserDTO userdto)
        {
            try
            {
                var user = _mapper.Map<User>(userdto);
                var result = await _userManager.CreateAsync(user, userdto.Password);
                var userToReturn = _mapper.Map<UserDTO>(user);

                if (result.Succeeded)
                {
                    return Created("Usuario criado com sucesso", userToReturn);
                }

                return BadRequest(result.Errors);

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }


        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginDTO loginDTO)
        {
            try
            {
                //var user = await _userManager.FindByNameAsync(loginDTO.UserName);
                var user = await _userManager.FindByNameAsync(loginDTO.UserName);
                //  var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);
                var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

                if (result.Succeeded)
                {
                    var appUser = await _userManager.Users
                        .FirstOrDefaultAsync(x => x.NormalizedUserName == loginDTO.UserName.ToUpper());

                    var userToReturn = _mapper.Map<UserLoginDTO>(appUser);

                    return Ok(new
                    {
                        token = GenerateTokenJWT(appUser).Result,
                        user = userToReturn
                    });

                }


                return Unauthorized();
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
        }

        private async Task<string> GenerateTokenJWT(User user)
        {
            var userClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier , user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var userRoles = await _userManager.GetRolesAsync(user);

            foreach (var role in userRoles)
            {
                userClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            //utilizando config
            //  var key = new SymmetricSecurityKey(Encoding.ASCII
            // .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var chave = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("l33t-sup4-hax0rr"));

            // var credenciais = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);
            var creds = new SigningCredentials(chave, SecurityAlgorithms.HmacSha512Signature);

            // var tokenJwt = new JwtSecurityToken
            // (
            //      claims: userClaims,
            //      signingCredentials: creds,
            //      expires: DateTime.Now.AddMinutes(5)
            // );

            var tokenJwt = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(userClaims),
                Expires = DateTime.UtcNow.AddMinutes(15),
                //Expires = DateTime.Now.AddMinutes(15),
                SigningCredentials = creds
            };

            System.Console.WriteLine($"################## DATETIME : {tokenJwt.Expires}");


            // token gerado com jwtsecurity token
            // var token = new JwtSecurityTokenHandler().WriteToken(tokenJwt);

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenJwt);

            return tokenHandler.WriteToken(token);
        }
    }
}