using System;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq.Expressions;
using StudentPortalAPI.Data;
using MongoDB.Driver;

public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
{
    protected readonly IDBContext _context;
    protected IMongoCollection<TEntity> _collection;

    public Repository(IDBContext context, string collectionName)
    {
        _context = context;
        _collection = _context.GetDatabase().GetCollection<TEntity>(collectionName);
    }

    public void Add(TEntity entity)
    {
        _collection.InsertOne(entity);
    }

    public void AddRange(IEnumerable<TEntity> entities)
    {
        _collection.InsertMany(entities);
    }

    public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
    {
        return _collection.FindSync(predicate).ToList();
    }

    public TEntity Get(ObjectId Id)
    {
        var filter = Builders<TEntity>.Filter.Eq("Id", Id);
        return _collection.Find(filter).FirstOrDefault();
    }

    public IEnumerable<TEntity> GetAll()
    {
        return _collection.Find(new BsonDocument()).ToList();
    }

    public DeleteResult Remove(Expression<Func<TEntity, bool>> predicate)
    {
       return _collection.DeleteOne(predicate);
    }

    public DeleteResult RemoveRange(Expression<Func<TEntity, bool>> predicate)
    {
       return _collection.DeleteMany(predicate);
    }
}