const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const GenderLookup = sequelize.define(
  "genderLookup",
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

(async () => {
  await sequelize.sync({ force: true });
  console.log("The table for the GenderLookup model was just (re)created!");
})();

module.exports = GenderLookup;
