const { Sequelize } = require("sequelize");

module.exports = new Sequelize("my_database", "lucia", "1104", {
  host: "localhost",
  dialect: "postgres",
});
