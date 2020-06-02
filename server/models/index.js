const sequelize = require("../config/database");

const Patient = require("./patient");
const Gender = require("./gender");
const Occupation = require("./occupation");

Gender.hasMany(Patient);
Patient.belongsTo(Gender);

Occupation.hasMany(Patient);
Patient.belongsTo(Occupation);

(async () => {
  await sequelize.sync({ force: true }).then(() => {
    // Gender Lookup Table
    Gender.create({ name: "Female" });
    Gender.create({ name: "Male" });
    Gender.create({ name: "Not stated" });

    // Occupation Lookup Table
    Occupation.create({ name: "Health care worker" });
    Occupation.create({
      name: "School or daycare worker/attendee",
    });
    Occupation.create({ name: "Long term care resident" });
    Occupation.create({ name: "Other" });
    Occupation.create({ name: "Not stated" });
  });
})();

module.exports = {
  Patient,
  Gender,
  Occupation,
};
