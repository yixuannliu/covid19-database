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

(async () => {
  await sequelize.sync().then(() => {
    Gender.findOrCreate({
      where: { id: 1 },
      default: { id: 1, name: "FEMALE" },
    });
    Gender.findOrCreate({
      where: { id: 2 },
      default: { id: 2, name: "MALE" },
    });
    Gender.findOrCreate({
      where: { id: 9 },
      default: { id: 9, name: "NOT STATED" },
    });
  });
})();

module.exports = Gender;
