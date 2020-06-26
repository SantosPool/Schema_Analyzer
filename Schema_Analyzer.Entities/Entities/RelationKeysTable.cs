using System;
using System.Collections.Generic;
using System.Text;

namespace Schema_Analyzer.Entities.Entities
{
    public class RelationKeysTable
    {
        public string Child { get; set; }
        public string RelationChild { get; set; }
        public string Parent { get; set; }
        public string RelationParent { get; set; }
    }
}
