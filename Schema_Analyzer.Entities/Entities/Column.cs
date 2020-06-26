using System;
using System.Collections.Generic;
using System.Text;

namespace Schema_Analyzer.Entities.Entities
{
    public class Column
    {
        public string NameColumn { get; set; }
        public string Descrip { get; set; }
        public string TypeColumn { get; set; }
        public bool IsPrimaryKey { get; set; }
        public bool IsForeignKey { get; set; }
        public bool Flag { get; set; }
        public string ParentTblName { get; set; }
        public string RelatedColName { get; set; }
        public string RelationID { get; set; }
    }
}
