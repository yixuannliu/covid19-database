const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Patient = sequelize.define(
  "patient",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  await sequelize.sync({ force: true });
  console.log("The table for the User model was just (re)created!");
})();

module.exports = Patient;
