using System;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq.Expressions;
using MongoDB.Driver;

public interface IRepository<TEntity> where TEntity: class
{
    TEntity Get(ObjectId Id);
    IEnumerable<TEntity> GetAll();
    IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);

    void Add(TEntity entity);
    void AddRange(IEnumerable<TEntity> entities);

    DeleteResult Remove(Expression<Func<TEntity, bool>> predicate);
    DeleteResult RemoveRange(Expression<Func<TEntity, bool>> predicate);
}