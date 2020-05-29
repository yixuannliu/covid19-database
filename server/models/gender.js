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
    Gender.create({ id: 1, name: "FEMALE" });
    Gender.create({ id: 2, name: "MALE" });
    Gender.create({ id: 9, name: "NOT STATED" });
  });
})();

module.exports = Gender;
