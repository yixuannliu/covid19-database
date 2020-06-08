const {
  getPatientLookupModel,
  getHealthStatusModel,
  patientModelFindAll,
} = require("./calculationsHelpers");

module.exports = {
  countPatientsByFilterType(req, res) {
    const { filterType, filterId, filterName } = req.query;
    if (!filterType) {
      return patientModelFindAll(res, {}, false);
    }

    const patientLookupModel = getPatientLookupModel(
      filterType,
      filterId,
      filterName
    );

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
    const { filterType, filterId, filterName } = req.query;

    const healthStatusModel = getHealthStatusModel(req.query);

    if (!filterType) {
      return patientModelFindAll(
        res,
        {
          includedModels: [healthStatusModel],
        },
        false
      );
    }

    const patientLookupModel = getPatientLookupModel(
      filterType,
      filterId,
      filterName
    );

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
