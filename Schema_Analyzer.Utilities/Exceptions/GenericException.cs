using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace Schema_Analyzer.Utilities.Exceptions
{
    public class GenericException : SystemException
    {
        public GenericException() : base() { }

        public GenericException(string message) : base(message) { }

        public GenericException(string message, params string[] args) : base(String.Format(CultureInfo.CurrentCulture, message, args)) { }
    }
}
