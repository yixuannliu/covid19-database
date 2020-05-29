const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Patient = sequelize.define(
  "patient",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    genderId: {
      type: DataTypes.INTEGER,
    },
    occupationId: {
      type: DataTypes.INTEGER,
    },
    regionId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await sequelize.sync();
})();

module.exports = Patient;
