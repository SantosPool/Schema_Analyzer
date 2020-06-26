using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace Schema_Analyzer.Repositories.Utilities
{
    public static class SqlExtensions
    {
        public static bool IsAvailable(this SqlConnection conn)
        {
            try
            {
                conn.Open();
                conn.Close();
            }
            catch (SqlException)
            {
                return false;
            }
            return true;
        }
    }
}
