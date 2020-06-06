const sequelize = require("../config/database");

const Patient = require("./patient");
const Gender = require("./gender");
const Occupation = require("./occupation");
const Region = require("./region");
const Hospital = require("./hospital");
const HealthStatus = require("./healthStatus");

Gender.hasMany(Patient);
Patient.belongsTo(Gender);

Occupation.hasMany(Patient);
Patient.belongsTo(Occupation);

Region.hasMany(Patient);
Patient.belongsTo(Region);

Hospital.hasMany(Patient);
Patient.belongsTo(Hospital);

Patient.hasOne(HealthStatus, {
  foreignKey: {
    allowNull: false,
  },
});
HealthStatus.belongsTo(Patient);

(async () => {
  await sequelize.sync({ force: true }).then(() => {
    // Gender Lookup Table
    Gender.create({ id: 1, name: "Female" });
    Gender.create({ id: 2, name: "Male" });
    Gender.create({ id: 9, name: "Not stated" });

    // Occupation Lookup Table
    Occupation.create({ id: 1, name: "Health care worker" });
    Occupation.create({
      id: 2,
      name: "School or daycare worker/attendee",
    });
    Occupation.create({ id: 3, name: "Long term care resident" });
    Occupation.create({ id: 4, name: "Other" });
    Occupation.create({ id: 9, name: "Not stated" });

    // Region Lookup Table
    Region.create({
      name:
        "Atlantic (New Brunswick, Nova Scotia, Prince Edward Island, Newfoundland and Labrador)",
    });
    Region.create({ name: "Quebec" });
    Region.create({ name: "Ontario and Nunavut" });
    Region.create({
      name:
        "Prairies (Alberta, Saskatchewan, and Manitoba) and the Northwest Territories",
    });
    Region.create({ name: "British Columbia and Yukon" });

    Hospital.create({
      name: "Toronto General Hospital",
      address: "343 Bay Street",
      capacity: 1000,
      ventilator: 8,
    });

    Patient.create({
      age: 65,
      genderId: 1,
      occupationId: 1,
      regionId: 2,
      hospitalId: 1,
    });
  });
})();

module.exports = {
  Patient,
  Gender,
  Occupation,
  Region,
  Hospital,
  HealthStatus,
};
