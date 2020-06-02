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

Patient.hasOne(HealthStatus);
HealthStatus.belongsTo(Patient);

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
