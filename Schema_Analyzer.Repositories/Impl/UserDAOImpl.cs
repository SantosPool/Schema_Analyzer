using NHibernate;
using NHibernate.Criterion;
using Schema_Analyzer.Database.NHibernate.Implementation;
using Schema_Analyzer.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Schema_Analyzer.Repositories.Impl
{
    public class UserDAOImpl : NHGenericDAOImpl<User, Int64>, IUserDAO
    {
        public User GetByName(User user)
        {
            User _user = Session.Query<User>().
                        Where(r =>(r.Username.Equals(user.Username)) && (r.Password.Equals(user.Password))).
                        FirstOrDefault();

            return _user;
        }
    }
}
