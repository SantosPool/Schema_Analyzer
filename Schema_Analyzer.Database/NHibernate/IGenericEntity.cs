using System;
using System.Collections.Generic;
using System.Text;

namespace Schema_Analyzer.Database.NHibernate
{
    public interface  IGenericEntity<PK>
    {
        PK Id { get; set; }
    }
}
