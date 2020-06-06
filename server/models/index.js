const sequelize = require("../config/database");

const Patient = require("./patient");
const Gender = require("./gender");
const Occupation = require("./occupation");
const Region = require("./region");
const Hospital = require("./hospital");
const HealthStatus = require("./healthStatus");

const {
  DEFAULT_VALUE_ID,
  GENDERS,
  OCCUPATIONS,
} = require("../utils/constants");

Gender.hasMany(Patient);
Patient.belongsTo(Gender, {
  foreignKey: {
    allowNull: false,
    defaultValue: DEFAULT_VALUE_ID,
  },
});

Occupation.hasMany(Patient);
Patient.belongsTo(Occupation, {
  foreignKey: {
    allowNull: false,
    defaultValue: DEFAULT_VALUE_ID,
  },
});

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
    Gender.create({ id: 1, name: GENDERS.FEMALE });
    Gender.create({ id: 2, name: GENDERS.MALE });
    Gender.create({ id: DEFAULT_VALUE_ID, name: GENDERS.NOT_STATED });

    // Occupation Lookup Table
    Occupation.create({ id: 1, name: OCCUPATIONS.HEALTH_CARE });
    Occupation.create({
      id: 2,
      name: OCCUPATIONS.SCHOOL,
    });
    Occupation.create({ id: 3, name: OCCUPATIONS.LONG_TERM_CARE });
    Occupation.create({ id: 4, name: OCCUPATIONS.OTHER });
    Occupation.create({ id: DEFAULT_VALUE_ID, name: OCCUPATIONS.NOT_STATED });

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

    // TODO: sample hospital/patient record
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
