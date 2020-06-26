using Schema_Analyzer.Database.NHibernate;
using System;
using System.Collections.Generic;
using System.Text;

namespace Schema_Analyzer.Entities.Entities
{
    public class User : IGenericEntity<Int64>
    {
        public virtual long Id { get; set; }
        public virtual string Username { get; set; }
        public virtual string Password { get; set; }
    }
}
