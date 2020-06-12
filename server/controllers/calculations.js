const {
  getPatientLookupModelObj,
  getHospitalModelObj,
  getHealthStatusModelObj,
  getSymptomModelObj,
  searchInPatientModel,
} = require("./calculationsHelpers");

module.exports = {
  countPatientsByFilterType(req, res) {
    const { filterType, filterId, filterName } = req.query;
    if (!filterType) {
      return searchInPatientModel(res, {});
    }

    const patientLookupModelObj = getPatientLookupModelObj(
      filterType,
      filterId,
      filterName
    );

    return searchInPatientModel(res, {
      addedAttribute: `${filterType}.name`,
      includedModels: [patientLookupModelObj],
      groupedAttributes: [`${filterType}.id`],
    });
  },
  countPatientsByHospital(req, res) {
    const { filterType, filterId, filterName } = req.query;

    const hospitalModelObj = getHospitalModelObj(req.query);

    if (!filterType) {
      return searchInPatientModel(res, { includedModels: [hospitalModelObj] });
    }

    const patientLookupModelObj = getPatientLookupModelObj(
      filterType,
      filterId,
      filterName
    );

    return searchInPatientModel(res, {
      addedAttribute: `${filterType}.name`,
      includedModels: [hospitalModelObj, patientLookupModelObj],
      groupedAttributes: [`${filterType}.id`],
    });
  },
  countPatientsByHealthStatus(req, res) {
    const { filterType, filterId, filterName } = req.query;

    const healthStatusModelObj = getHealthStatusModelObj(req.query);

    if (!filterType) {
      return searchInPatientModel(res, {
        includedModels: [healthStatusModelObj],
      });
    }

    const patientLookupModelObj = getPatientLookupModelObj(
      filterType,
      filterId,
      filterName
    );

    return searchInPatientModel(res, {
      addedAttribute: `${filterType}.name`,
      includedModels: [healthStatusModelObj, patientLookupModelObj],
      groupedAttributes: [`${filterType}.id`],
    });
  },
  countPatientsBySymptom(req, res) {
    const { filterType, filterId, filterName } = req.query;

    const symptomModelObj = getSymptomModelObj(req.query);

    if (!filterType) {
      return searchInPatientModel(res, {
        includedModels: [symptomModelObj],
      });
    }

    const patientLookupModelObj = getPatientLookupModelObj(
      filterType,
      filterId,
      filterName
    );

    return searchInPatientModel(res, {
      addedAttribute: `${filterType}.name`,
      includedModels: [symptomModelObj, patientLookupModelObj],
      groupedAttributes: [`${filterType}.id`],
    });
  },
};
