using System;
using MongoDB.Driver;

namespace StudentPortalAPI.Data
{
    public interface IDBContext
    {
        MongoClient GetConnection();
        IMongoDatabase GetDatabase();
    }
}