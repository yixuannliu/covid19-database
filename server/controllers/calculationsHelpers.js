const sequelize = require("../config/database");
const { PATIENT_LOOKUP_TABLES } = require("../utils/constants");

const Patient = require("../models").Patient;
const Gender = require("../models").Gender;
const Occupation = require("../models").Occupation;
const Region = require("../models").Region;

const getFormattedPatientCount = (array) => {
  if (array.length === 0) {
    return {};
  }
  return array.reduce((acc, curr) => {
    const { name, patientCount } = curr;
    acc[name] = patientCount;
    return acc;
  }, {});
};

const getWhereClause = (filterId, filterName) => {
  if (filterId) return { id: filterId };
  if (filterName) return { name: filterName };
  return {};
};

const getLeftJoinModel = (filterType) => {
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
};

const patientModelFindAll = (res, options, shouldFormatResult) => {
  const { addedAttribute, includedModels, groupedAttributes } = options;

  const attributes = [
    [sequelize.fn("count", sequelize.col("patient.id")), "patientCount"],
  ];

  if (addedAttribute) {
    attributes.push(addedAttribute);
  }

  return Patient.findAll({
    raw: true,
    attributes,
    include: includedModels,
    group: groupedAttributes,
  })
    .then((rows) =>
      res
        .status(200)
        .send(shouldFormatResult ? getFormattedPatientCount(rows) : rows)
    )
    .catch((error) => res.status(400).send(error));
};

module.exports = {
  getFormattedPatientCount,
  getWhereClause,
  getLeftJoinModel,
  patientModelFindAll,
};
