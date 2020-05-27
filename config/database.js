const { Sequelize } = require("sequelize");

module.exports = new Sequelize("covid19_cases", "lucia", "1104", {
  host: "localhost",
  dialect: "postgres",
});
