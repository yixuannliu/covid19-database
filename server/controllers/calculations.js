const {
  getPatientLookupModelObj,
  getHospitalModelObj,
  getHealthStatusModelObj,
  getSymptomModelObj,
  searchInPatientModel,
} = require("./calculationsHelpers");

module.exports = {
  countPatientsByFilterType(req, res) {
    const { filterType } = req.query;
    if (!filterType) {
      return searchInPatientModel(res, req.query, {});
    }

    const patientLookupModelObj = getPatientLookupModelObj(req.query);

    return searchInPatientModel(res, req.query, {
      addedAttribute: `${filterType}.name`,
      includedModels: [patientLookupModelObj],
      groupedAttributes: [`${filterType}.id`],
    });
  },
  countPatientsByHospital(req, res) {
    const { filterType } = req.query;

    const hospitalModelObj = getHospitalModelObj(req.query);

    if (!filterType) {
      return searchInPatientModel(res, req.query, {
        includedModels: [hospitalModelObj],
      });
    }

    const patientLookupModelObj = getPatientLookupModelObj(req.query);

    return searchInPatientModel(res, req.query, {
      addedAttribute: `${filterType}.name`,
      includedModels: [hospitalModelObj, patientLookupModelObj],
      groupedAttributes: [`${filterType}.id`],
    });
  },
  countPatientsByHealthStatus(req, res) {
    const { filterType } = req.query;

    const healthStatusModelObj = getHealthStatusModelObj(req.query);

    if (!filterType) {
      return searchInPatientModel(res, req.query, {
        includedModels: [healthStatusModelObj],
      });
    }

    const patientLookupModelObj = getPatientLookupModelObj(req.query);

    return searchInPatientModel(res, req.query, {
      addedAttribute: `${filterType}.name`,
      includedModels: [healthStatusModelObj, patientLookupModelObj],
      groupedAttributes: [`${filterType}.id`],
    });
  },
  countPatientsBySymptom(req, res) {
    const { filterType } = req.query;

    const symptomModelObj = getSymptomModelObj(req.query);

    if (!filterType) {
      return searchInPatientModel(res, req.query, {
        includedModels: [symptomModelObj],
      });
    }

    const patientLookupModelObj = getPatientLookupModelObj(req.query);

    return searchInPatientModel(res, req.query, {
      addedAttribute: `${filterType}.name`,
      includedModels: [symptomModelObj, patientLookupModelObj],
      groupedAttributes: [`${filterType}.id`],
    });
  },
};
