const { PATIENT_LOOKUP_TABLES } = require("../utils/constants");

const Gender = require("../models").Gender;
const Occupation = require("../models").Occupation;
const Region = require("../models").Region;

module.exports = {
  getFormattedPatientCount(array) {
    if (array.length === 0) {
      return {};
    }
    return array.reduce((acc, curr) => {
      const { name, patientCount } = curr;
      acc[name] = patientCount;
      return acc;
    }, {});
  },
  getWhereClause(filterId, filterName) {
    if (filterId) return { id: filterId };
    if (filterName) return { name: filterName };
    return {};
  },
  getLeftJoinModel(filterType) {
    switch (filterType) {
      case PATIENT_LOOKUP_TABLES.GENDER:
        return Gender;
      case PATIENT_LOOKUP_TABLES.OCCUPATION:
        return Occupation;
      case PATIENT_LOOKUP_TABLES.REGION:
        return Region;
      default:
        return Gender;
    }
  },
};
