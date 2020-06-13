const { Op } = require("sequelize");
const { isNil, pick } = require("lodash");

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
    model: getLeftJoinModel(requestQuery.filterType),
    attributes: [],
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
  const whereClause = Object.entries(
    pick(requestQuery, [
      "isAsymptomatic",
      "hasCough",
      "hasFever",
      "hasHeadache",
      "hasWeakness",
    ])
  ).reduce((acc, [key, value]) => {
    if (!isNil(value)) {
      acc[key] = value;
    }
    return acc;
  }, {});

  return {
    model: Symptom,
    attributes: [],
    where: whereClause,
  };
};

const searchInPatientModel = (res, requestQuery, options) => {
  const getWhereClause = (requestQuery) => {
    const {
      filterMinAge,
      filterMaxAge,
      filterType,
      filterId,
      filterName,
    } = requestQuery;

    let whereClause = {};
    if (filterId) {
      whereClause[`$${filterType}.id$`] = filterId;
    }
    if (filterName) {
      whereClause[`$${filterType}.name$`] = filterName;
    }
    if (isNil(filterMaxAge) && isNil(filterMinAge)) {
      return whereClause;
    }

    let whereClauseForAge = {};
    if (!isNil(filterMaxAge)) {
      whereClauseForAge[Op.lte] = filterMaxAge;
    }
    if (!isNil(filterMinAge)) {
      whereClauseForAge[Op.gte] = filterMinAge;
    }
    whereClause["age"] = whereClauseForAge;
    return whereClause;
  };

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
    where: getWhereClause(requestQuery),
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
