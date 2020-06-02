const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HealthStatus = sequelize.define(
  "healthStatus",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    onsetWeekOfSymptoms: {
      type: DataTypes.INTEGER,
    },
    isRecovered: {
      type: DataTypes.BOOLEAN,
    },
    recoveryWeek: {
      type: DataTypes.INTEGER,
    },
    death: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = HealthStatus;
