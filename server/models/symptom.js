const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Symptom = sequelize.define(
  "symptom",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    isAsymptomatic: {
      type: DataTypes.BOOLEAN,
    },
    hasCough: {
      type: DataTypes.BOOLEAN,
    },
    hasFever: {
      type: DataTypes.BOOLEAN,
    },
    hasHeadache: {
      type: DataTypes.BOOLEAN,
    },
    hasWeakness: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Symptom;
