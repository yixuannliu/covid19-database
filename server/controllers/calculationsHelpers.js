const { Op } = require("sequelize");
const { isNil, isEmpty } = require("lodash");

const sequelize = require("../config/database");
const { PATIENT_REFERENCE_TABLES } = require("../utils/constants");

const {
  Patient,
  Gender,
  Occupation,
  Region,
  HealthStatus,
  Symptom,
  Hospital,
} = require("../models");

const getFormattedPatientCount = (array) => {
  if (array.length === 0) {
    return {};
  }
  return array.reduce((acc, curr) => {
    const { name, patientCount } = curr;
    if (!name) {
      acc["total"] = patientCount;
      return acc;
    }
    acc[name] = patientCount;
    return acc;
  }, {});
};

const getPatientLookupModelObj = (requestQuery) => {
  const { filterType, filterId, filterName } = requestQuery;

  const getWhereClause = (filterId, filterName) => {
    if (filterId) return { id: filterId };
    if (filterName) return { name: filterName };
    return {};
  };

  const getLeftJoinModel = (filterType) => {
    switch (filterType) {
      case PATIENT_REFERENCE_TABLES.GENDER:
        return Gender;
      case PATIENT_REFERENCE_TABLES.OCCUPATION:
        return Occupation;
      case PATIENT_REFERENCE_TABLES.REGION:
        return Region;
      case PATIENT_REFERENCE_TABLES.HOSPITAL:
        return Hospital;
      default:
        return Gender;
    }
  };

  return {
    model: getLeftJoinModel(filterType),
    attributes: [],
    where: getWhereClause(filterId, filterName),
    required: filterId || filterName ? true : false,
    // required: false,
    right: true, // will create a right join
  };
};

const getHospitalModelObj = (requestQuery) => {
  const { hospitalId, hospitalName } = requestQuery;

  let whereClause = {};
  if (!isNil(hospitalId)) {
    whereClause["id"] = hospitalId;
  }
  if (!isNil(hospitalName)) {
    whereClause["name"] = hospitalName;
  }

  return {
    model: Hospital,
    attributes: [],
    where: whereClause,
  };
};

const getHealthStatusModelObj = (requestQuery) => {
  const {
    isRecovered,
    maxRecoveryWeek,
    maxOnsetWeekOfSymptoms,
    death,
  } = requestQuery;

  let whereClause = {};
  if (!isNil(maxRecoveryWeek)) {
    whereClause["recoveryWeek"] = {
      [Op.lte]: maxRecoveryWeek,
    };
  }
  if (!isNil(isRecovered)) {
    whereClause["isRecovered"] = isRecovered;
  }
  if (!isNil(maxOnsetWeekOfSymptoms)) {
    whereClause["onsetWeekOfSymptoms"] = {
      [Op.lte]: maxOnsetWeekOfSymptoms,
    };
  }
  if (!isNil(death)) {
    whereClause["death"] = death;
  }

  return {
    model: HealthStatus,
    attributes: [],
    where: whereClause,
  };
};

const getSymptomModelObj = (requestQuery) => {
  const {
    isAsymptomatic,
    hasCough,
    hasFever,
    hasHeadache,
    hasWeakness,
  } = requestQuery;

  let whereClause = {};
  if (!isNil(isAsymptomatic)) {
    whereClause["isAsymptomatic"] = isAsymptomatic;
  }
  if (!isNil(hasCough)) {
    whereClause["hasCough"] = hasCough;
  }
  if (!isNil(hasFever)) {
    whereClause["hasFever"] = hasFever;
  }
  if (!isNil(hasHeadache)) {
    whereClause["hasHeadache"] = hasHeadache;
  }
  if (!isNil(hasWeakness)) {
    whereClause["hasWeakness"] = hasWeakness;
  }

  return {
    model: Symptom,
    attributes: [],
    where: whereClause,
  };
};

const searchInPatientModel = (res, requestQuery, options) => {
  const { addedAttribute, includedModels, groupedAttributes } = options;
  const { filterMinAge, filterMaxAge } = requestQuery;

  const attributes = [
    [sequelize.fn("count", sequelize.col("patient.id")), "patientCount"],
  ];

  if (addedAttribute) {
    attributes.push(addedAttribute);
  }

  let whereClauseForAge = {};
  if (!isNil(filterMaxAge)) {
    whereClauseForAge[Op.lte] = filterMaxAge;
  }
  if (!isNil(filterMinAge)) {
    whereClauseForAge[Op.gte] = filterMinAge;
  }

  return Patient.findAll({
    raw: true,
    attributes,
    include: includedModels,
    where:
      isNil(filterMaxAge) && isNil(filterMinAge)
        ? {}
        : { age: whereClauseForAge },
    group: groupedAttributes,
  })
    .then((rows) => res.status(200).send(getFormattedPatientCount(rows)))
    .catch((error) => res.status(400).send(error));
};

module.exports = {
  getPatientLookupModelObj,
  getHospitalModelObj,
  getHealthStatusModelObj,
  getSymptomModelObj,
  searchInPatientModel,
};
