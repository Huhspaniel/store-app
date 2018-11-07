module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASS,
    database: "calendarDB",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: process.env.DB_PASS,
    database: "calendarDB_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: process.env.DB_PASS,
    database: "calendarDB_production",
    host: "127.0.0.1",
    dialect: "mysql",
    use_env_variable: "JAWSDB_URL"
  }
}