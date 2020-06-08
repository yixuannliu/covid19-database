const {
  getPatientLookupModelObj,
  getHealthStatusModelObj,
  getSymptomModelObj,
  searchInPatientModel,
} = require("./calculationsHelpers");

module.exports = {
  countPatientsByFilterType(req, res) {
    const { filterType, filterId, filterName } = req.query;
    if (!filterType) {
      return searchInPatientModel(res, {}, false);
    }

    const patientLookupModelObj = getPatientLookupModelObj(
      filterType,
      filterId,
      filterName
    );

    return searchInPatientModel(
      res,
      {
        addedAttribute: `${filterType}.name`,
        includedModels: [patientLookupModelObj],
        groupedAttributes: [`${filterType}.id`],
      },
      true
    );
  },
  countPatientsByHealthStatus(req, res) {
    const { filterType, filterId, filterName } = req.query;

    const healthStatusModelObj = getHealthStatusModelObj(req.query);

    if (!filterType) {
      return searchInPatientModel(
        res,
        {
          includedModels: [healthStatusModelObj],
        },
        false
      );
    }

    const patientLookupModelObj = getPatientLookupModelObj(
      filterType,
      filterId,
      filterName
    );

    return searchInPatientModel(
      res,
      {
        addedAttribute: `${filterType}.name`,
        includedModels: [healthStatusModelObj, patientLookupModelObj],
        groupedAttributes: [`${filterType}.id`],
      },
      true
    );
  },
  countPatientsBySymptom(req, res) {
    const { filterType, filterId, filterName } = req.query;

    const symptomModelObj = getSymptomModelObj(req.query);

    if (!filterType) {
      return searchInPatientModel(
        res,
        {
          includedModels: [symptomModelObj],
        },
        false
      );
    }

    const patientLookupModelObj = getPatientLookupModelObj(
      filterType,
      filterId,
      filterName
    );

    return searchInPatientModel(
      res,
      {
        addedAttribute: `${filterType}.name`,
        includedModels: [symptomModelObj, patientLookupModelObj],
        groupedAttributes: [`${filterType}.id`],
      },
      true
    );
  },
};
