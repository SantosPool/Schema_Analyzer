using FluentNHibernate.Mapping;
using Schema_Analyzer.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Schema_Analyzer.Entities.Mappings
{
    public class UserMap : ClassMap<User>
    {
        public UserMap()
        {
            Table("tblUser");            
            Id(x => x.Id, "id");
            Map(x => x.Username, "username");
            Map(x => x.Password, "password");
        }
    }
}
