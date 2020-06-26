using Schema_Analyzer.Database.NHibernate;
using Schema_Analyzer.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Schema_Analyzer.Repositories
{
    public interface ISchemaDAO 
    {
        Schema GetallTablesandProperties(Connection con);
    }
}
