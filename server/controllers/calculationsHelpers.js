const { Op } = require("sequelize");
const { isNil } = require("lodash");

const sequelize = require("../config/database");
const { PATIENT_LOOKUP_TABLES } = require("../utils/constants");

const Patient = require("../models").Patient;
const Gender = require("../models").Gender;
const Occupation = require("../models").Occupation;
const Region = require("../models").Region;
const HealthStatus = require("../models").HealthStatus;

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

const getPatientLookupModelObj = (filterType, filterId, filterName) => {
  return {
    model: getLeftJoinModel(filterType),
    attributes: [],
    where: getWhereClause(filterId, filterName),
  };
};

const getHealthStatusModelObj = (requestQuery) => {
  const {
    isRecovered,
    maxRecoveryWeek,
    maxOnsetWeekOfSymptoms,
    death,
  } = requestQuery;

  let healthStatusWhereClause = {};
  if (!isNil(maxRecoveryWeek)) {
    healthStatusWhereClause["recoveryWeek"] = {
      [Op.lte]: maxRecoveryWeek,
    };
  }
  if (!isNil(isRecovered)) {
    healthStatusWhereClause["isRecovered"] = isRecovered;
  }
  if (!isNil(maxOnsetWeekOfSymptoms)) {
    healthStatusWhereClause["onsetWeekOfSymptoms"] = {
      [Op.lte]: maxOnsetWeekOfSymptoms,
    };
  }
  if (!isNil(death)) {
    healthStatusWhereClause["death"] = death;
  }

  return {
    model: HealthStatus,
    attributes: [],
    where: healthStatusWhereClause,
  };
};

const searchInPatientModel = (res, options, shouldFormatResult) => {
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
  getPatientLookupModelObj,
  getHealthStatusModelObj,
  searchInPatientModel,
};
