const Symptom = require("../models").Symptom;
const helperControllers = require("./helpers");

module.exports = {
  create(req, res) {
    helperControllers.create(res, Symptom, {
      ...req.body,
      patientId: req.params.patientId,
    });
  },
  list(req, res) {
    helperControllers.list(res, Symptom);
  },
  retrieve(req, res) {
    helperControllers.retrieveByColumn(res, Symptom, {
      patientId: req.params.patientId,
    });
  },
  update(req, res) {
    helperControllers.update(res, Symptom, req.body, req.params.patientId);
  },
  destroy(req, res) {
    helperControllers.destroy(res, Symptom, req.params.patientId);
  },
  destroyAll(req, res) {
    helperControllers.destroyAll(res, Symptom);
  },
};
