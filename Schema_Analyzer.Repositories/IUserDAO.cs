using Schema_Analyzer.Database.NHibernate;
using Schema_Analyzer.Entities.Entities;
using System;

namespace Schema_Analyzer.Repositories
{
    public interface IUserDAO : IDAOGeneric<User, Int64>
    {
        User GetByName(User user);
    }
}