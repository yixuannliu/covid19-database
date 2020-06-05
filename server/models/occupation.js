const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Occupation = sequelize.define(
  "occupation",
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

module.exports = Occupation;
