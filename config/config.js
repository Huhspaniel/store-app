module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASS,
    database: "bamazon",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    define: {
      underscored: true,
      underscoredAll: true
    }
  },
  test: {
    username: "root",
    password: process.env.DB_PASS,
    database: "bamazon_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    define: {
      underscored: true,
      underscoredAll: true
    }
  }
}