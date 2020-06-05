const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Gender = sequelize.define(
  "gender",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Gender;
