using DatabaseSchemaReader;
using Schema_Analyzer.Entities.Entities;
using Schema_Analyzer.Repositories.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Schema_Analyzer.Repositories.Impl
{
    public class SchemaDAOImpl : ISchemaDAO
    {

        public Schema GetallTablesandProperties(Connection con)
        {
            Schema resp = new Schema();
            resp.Exception = "";
            using (var connection = new SqlConnection("Data Source=" + con.Server + ";Initial Catalog=" + con.DB + ";Persist Security Info=True;User ID=" + con.User + ";Password=" + con.Pass + ""))
            {
                if (SqlExtensions.IsAvailable(connection))
                {
                    try
                    {
                        DataTable dtKeys = new DataTable();
                        SqlCommand cmd = new SqlCommand("schema_analyzer_keys", connection);
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        da.Fill(dtKeys);

                        var listKeys = (from DataRow item in dtKeys.Rows select new { TableName = item["TableName"].ToString(),DescripTable= item["DescripTable"].ToString(), ColumnName = item["ColumnName"].ToString(), DescripColumn = item["DescripColumn"].ToString(), IsForeignKey = Convert.ToBoolean(item["IsForeignKey"]), IsPrimaryKey = Convert.ToBoolean(item["IsPrimaryKey"]), Flag = Convert.ToBoolean(item["Flag"]), ParentTblName = item["ParentTblName"].ToString(), RelatedColName = item["RelatedColName"].ToString(), RelationID = item["RelationID"].ToString() }).ToList();

                        var dbReader = new DatabaseReader(connection);
                        //Then load the schema (this will take a little time on moderate to large database structures)
                        var schema = dbReader.ReadAll();

                        //The structure is identical for all providers (and the full framework).
                        List<Table> listTables = new List<Table>();
                        listTables.Clear();
                        List<RelationKeysTable> listRelationKeysTables = new List<RelationKeysTable>();
                        listRelationKeysTables.Clear();
                        int counter = 1;
                        string idTableParent = "C";
                        string idTableChild = "CC";
                        foreach (var table in schema.Tables)
                        {
                            string descripTable = listKeys.Where(x => ((x.TableName.ToLower().Equals(table.Name.ToLower())))).Select(x => x.DescripTable).FirstOrDefault();
                            List<Column> listColumns = new List<Column>();
                            Table objTable = new Table();
                            objTable.Name = table.Name;
                            objTable.Descrip = (string.IsNullOrEmpty(descripTable)) ? "Not Found Information" : descripTable;
                            foreach (var column in table.Columns)
                            {
                                bool flag = listKeys.Where(x => ((x.TableName.ToLower().Equals(table.Name.ToLower())) && (x.ColumnName.ToLower().Equals(column.Name.ToLower())))).Select(x => x.Flag).FirstOrDefault();
                                string descripColumn = listKeys.Where(x => ((x.TableName.ToLower().Equals(table.Name.ToLower())) && (x.ColumnName.ToLower().Equals(column.Name.ToLower())))).Select(x => x.DescripColumn).FirstOrDefault();

                                Column objColumn = new Column();
                                objColumn.NameColumn = column.Name;
                                objColumn.Descrip= (string.IsNullOrEmpty(descripColumn)) ? "Not Found Information" : descripColumn;
                                objColumn.TypeColumn = column.DataType.TypeName;
                                objColumn.IsPrimaryKey = listKeys.Where(x => ((x.TableName.ToLower().Equals(table.Name.ToLower())) && (x.ColumnName.ToLower().Equals(column.Name.ToLower())))).Select(x => x.IsPrimaryKey).FirstOrDefault();
                                objColumn.IsForeignKey = listKeys.Where(x => ((x.TableName.ToLower().Equals(table.Name.ToLower())) && (x.ColumnName.ToLower().Equals(column.Name.ToLower())))).Select(x => x.IsForeignKey).FirstOrDefault();
                                objColumn.Flag = flag;
                                objColumn.ParentTblName = listKeys.Where(x => ((x.TableName.ToLower().Equals(table.Name.ToLower())) && (x.ColumnName.ToLower().Equals(column.Name.ToLower())))).Select(x => x.ParentTblName).FirstOrDefault();
                                objColumn.RelatedColName = listKeys.Where(x => ((x.TableName.ToLower().Equals(table.Name.ToLower())) && (x.ColumnName.ToLower().Equals(column.Name.ToLower())))).Select(x => x.RelatedColName).FirstOrDefault();
                                objColumn.RelationID = listKeys.Where(x => ((x.TableName.ToLower().Equals(table.Name.ToLower())) && (x.ColumnName.ToLower().Equals(column.Name.ToLower())))).Select(x => x.RelationID).FirstOrDefault();
                                if (flag)
                                {
                                    RelationKeysTable relation = new RelationKeysTable();
                                    relation.Child = table.Name;
                                    relation.RelationChild = idTableChild + counter.ToString();
                                    relation.Parent = objColumn.ParentTblName;
                                    relation.RelationParent = idTableParent + counter.ToString();
                                    listRelationKeysTables.Add(relation);
                                }
                                listColumns.Add(objColumn);
                                counter++;
                            }
                            objTable.Columns = listColumns;
                            listTables.Add(objTable);

                        }
                        resp.Tables = listTables;
                        resp.RelationKeys = listRelationKeysTables;
                    }
                    catch (Exception)
                    {
                        resp.Exception = "Exist Problem Creating Schema...";
                    }
                }
                else
                {
                    resp.Exception = "Could not establish a connection with Database...";
                }
            }
            return resp;
        }
    }
}
