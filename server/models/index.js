const fs = require("fs");
const csvParser = require("csv-parser");

const sequelize = require("../config/database");

const Patient = require("./patient");
const Gender = require("./gender");
const Occupation = require("./occupation");
const Region = require("./region");
const Hospital = require("./hospital");
const HealthStatus = require("./healthStatus");
const Symptom = require("./symptom");

const { DEFAULT_VALUE_ID } = require("../utils/constants");

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

Patient.hasOne(Symptom, {
  foreignKey: {
    allowNull: false,
  },
});
Symptom.belongsTo(Patient);

const readCSVFile = (model, modelName, onlyOneColumn = false) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(`${__dirname}/data/${modelName}.csv`)
      .pipe(onlyOneColumn ? csvParser({ separator: "\t" }) : csvParser())
      .on("error", (err) => reject(err))
      .on("data", (row) => model.create(row))
      .on("end", () => {
        console.log(`${modelName.toUpperCase()} Table has been initiallized.`);
        resolve();
      });
  });
};

(async () => {
  await sequelize.sync({ force: true }).then(async () => {
    await readCSVFile(Gender, "gender");
    await readCSVFile(Occupation, "occupation");
    await readCSVFile(Region, "region", true);
    await readCSVFile(Hospital, "hospital");
    await readCSVFile(Patient, "patient");
  });
})();

module.exports = {
  Patient,
  Gender,
  Occupation,
  Region,
  Hospital,
  HealthStatus,
  Symptom,
};
