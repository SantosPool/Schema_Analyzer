using Schema_Analyzer.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Schema_Analyzer.Services
{
    public interface ISchemaService
    {
        Schema GetallTablesandProperties(Connection con);
    }
}
