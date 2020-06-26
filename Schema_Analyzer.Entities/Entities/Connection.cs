using System;
using System.Collections.Generic;
using System.Text;

namespace Schema_Analyzer.Entities.Entities
{
   public  class Connection
    {
        public string Server { get; set; }
        public string DB { get; set; }
        public string User { get; set; }
        public string Pass { get; set; }
    }
}
