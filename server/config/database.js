const { Sequelize } = require("sequelize");
const config = require("./config.json");

module.exports = new Sequelize(
  config.database.dbName,
  config.database.master.user,
  config.database.master.password,
  {
    host: config.database.master.host,
    dialect: config.database.protocol,
  }
);
