using Schema_Analyzer.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Schema_Analyzer.Services
{
    public interface  IUserService
    {
        void Save(User u);
        IList<User> FindAll();
        User Get(long id);
        void Update(User u);
        void Delete(long id);
        User GetByName(User user);
    }
}
