using System;
using System.Collections.Generic;
using System.Text;

namespace Schema_Analyzer.Entities.Entities
{
    public class Table
    {
        public string Name { get; set; }
        public string Descrip { get; set; }
        public List<Column> Columns{get; set;}
    }
}
