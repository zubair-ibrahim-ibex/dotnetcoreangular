using MongoDB.Driver;

namespace StudentPortalAPI.Data
{
    public class DBContext : IDBContext
    {
        private readonly string connectionString = "mongodb://localhost";
        private readonly string database = "studentportal";
        public MongoClient GetConnection()
        {
            MongoClient mongoClient = new MongoClient(this.connectionString);
            return mongoClient;
        }

        public IMongoDatabase GetDatabase()
        {
            return this.GetConnection().GetDatabase(this.database);
        }
    }
}