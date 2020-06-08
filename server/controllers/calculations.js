const { Op } = require("sequelize");
const sequelize = require("../config/database");

const Patient = require("../models").Patient;
const HealthStatus = require("../models").HealthStatus;

const {
  getFormattedPatientCount,
  getWhereClause,
  getLeftJoinModel,
  patientModelFindAll,
} = require("./calculationsHelpers");

module.exports = {
  countPatientsByFilterType(req, res) {
    const { filterType, filterId, filterName } = req.query;
    if (!filterType) {
      return patientModelFindAll(res, {}, false);
    }

    const patientLookupModel = {
      model: getLeftJoinModel(filterType),
      attributes: [],
      where: getWhereClause(filterId, filterName),
    };

    return patientModelFindAll(
      res,
      {
        addedAttribute: `${filterType}.name`,
        includedModels: [patientLookupModel],
        groupedAttributes: [`${filterType}.id`],
      },
      true
    );
  },
  countPatientsHealthStatus(req, res) {
    const {
      filterType,
      filterId,
      filterName,
      isRecovered,
      maxRecoveryWeek,
    } = req.query;

    const healthStatusModel = {
      model: HealthStatus,
      attributes: [],
      where: {
        // TODO: different where clause
        recoveryWeek: {
          [Op.lte]: maxRecoveryWeek,
        },
      },
    };

    if (!filterType) {
      return patientModelFindAll(
        res,
        {
          includedModels: [healthStatusModel],
        },
        false
      );
    }

    const patientLookupModel = {
      model: getLeftJoinModel(filterType),
      attributes: [],
      where: getWhereClause(filterId, filterName),
    };

    return patientModelFindAll(
      res,
      {
        addedAttribute: `${filterType}.name`,
        includedModels: [healthStatusModel, patientLookupModel],
        groupedAttributes: [`${filterType}.id`],
      },
      true
    );
  },
};
