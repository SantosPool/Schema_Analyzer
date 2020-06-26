using System;
using System.Collections.Generic;
using System.Text;

namespace Schema_Analyzer.Entities.Entities
{
    public class Schema
    {        
        public List<Table> Tables { get; set; }
        public List<RelationKeysTable> RelationKeys { get; set; }
        public string Exception { get; set; }
    }
}
