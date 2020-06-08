const {
  getPatientLookupModelObj,
  getHealthStatusModelObj,
  searchInPatientModel,
} = require("./calculationsHelpers");

module.exports = {
  countPatientsByFilterType(req, res) {
    const { filterType, filterId, filterName } = req.query;
    if (!filterType) {
      return searchInPatientModel(res, {}, false);
    }

    const patientLookupModel = getPatientLookupModelObj(
      filterType,
      filterId,
      filterName
    );

    return searchInPatientModel(
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

    const healthStatusModel = getHealthStatusModelObj(req.query);

    if (!filterType) {
      return searchInPatientModel(
        res,
        {
          includedModels: [healthStatusModel],
        },
        false
      );
    }

    const patientLookupModel = getPatientLookupModelObj(
      filterType,
      filterId,
      filterName
    );

    return searchInPatientModel(
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
