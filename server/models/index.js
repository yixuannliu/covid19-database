const Patient = require("./patient");
const Gender = require("./gender");

Gender.hasMany(Patient);
Patient.belongsTo(Gender);

module.exports = {
  Patient,
  Gender,
};
