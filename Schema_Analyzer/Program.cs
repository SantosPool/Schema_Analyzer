using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NHibernate;
using Schema_Analyzer.Database.NHibernate;
using Schema_Analyzer.Entities.Entities;
using Schema_Analyzer.WebUtils;

namespace Schema_Analyzer
{
    public class Program
    {

        public static void Main(string[] args)
        {
            //CreateWebHostBuilder(args).Build().Run();
            try
            {
                SessionUtilities.SessionFactoryHost = CreateSessionFactory();
                var host = BuildWebHost(args);
                host.Run();
            }
            catch (Exception e)
            {

                throw e;
            }
        }


        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();

        private static ISessionFactory CreateSessionFactory()
        {
            // configure jwt authentication
            return Fluently.Configure()
                    .Database(
                      MsSqlConfiguration.MsSql2012.ConnectionString("Data Source=localhost; Initial Catalog=Test; User ID=test; Password=test")
                      .ShowSql()
                      .FormatSql()
                    ).Mappings(m => m.FluentMappings.AddFromAssemblyOf<User>())
                    .BuildSessionFactory();
        }

        //public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
        //    WebHost.CreateDefaultBuilder(args)
        //        .UseStartup<Startup>();
    }
}
