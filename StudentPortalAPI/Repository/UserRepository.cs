using System;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq.Expressions;
using StudentPortalAPI.Data;
using MongoDB.Driver;
using StudentPortalAPI.Models;
using StudentPortalAPI.Dtos;
using StudentPortalAPI.Helpers;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

public class UserRepository : Repository<User>, IUserRepository
{
    private readonly AppSettings _appSettings;
    public UserRepository(IDBContext context, IOptions<AppSettings> appSettings) : base(context, "users")
    {
        _appSettings = appSettings.Value;
    }

    public User Authenticate(string email, string password)
    {
        var user = this.GetUserByEmailAndPassword(email, password);
        if (user == null)
            return null;

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[] 
            {
                new Claim(ClaimTypes.Name, user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        user.Token = tokenHandler.WriteToken(token);
        user.Password = null;
        
        return user;    
    }

    public User GetUserByEmailAndPassword(string email, string password)
    {
        try
        {
            var builder = Builders<User>.Filter;
            var filter = builder.Eq(u => u.Email, email) & builder.Eq(u => u.Password, password);;
            var user = _collection.Find(filter).First();
            return user;
        }
        catch(Exception ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }
    }

    public User IsExists(string email)
    {
        try
        {
            var user = _collection.Find((u) => u.Email == email).First();
            return user;
        }
        catch(Exception ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }
    }

    public User Register(User user)
    {
        this.Add(user);
        return user;
    }
}