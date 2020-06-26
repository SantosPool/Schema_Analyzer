using Schema_Analyzer.Entities.Entities;
using Schema_Analyzer.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Schema_Analyzer.Services.Impl
{
    public class SchemaServiceImpl:ISchemaService
    {
        private ISchemaDAO schemaDAO;

        public SchemaServiceImpl(ISchemaDAO _schemaDAO)
        {
            this.schemaDAO = _schemaDAO;
        }
        public Schema GetallTablesandProperties(Connection con)
        {
            var o = this.schemaDAO.GetallTablesandProperties(con);
            return o;
        }
    }
}
