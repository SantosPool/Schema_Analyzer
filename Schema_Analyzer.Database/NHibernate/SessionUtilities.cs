using NHibernate;
namespace Schema_Analyzer.Database.NHibernate
{
    public class SessionUtilities
    {
        private static ISessionFactory _sessionFactoryHost = null;

        public static ISessionFactory SessionFactoryHost
        {
            get { return _sessionFactoryHost; }
            set { _sessionFactoryHost = value; }
        }

        public static ISession Open()
        {
            return SessionFactoryHost.OpenSession();
        }
    }
}
