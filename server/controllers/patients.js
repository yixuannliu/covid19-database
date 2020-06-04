const Patient = require("../models").Patient;
const helperControllers = require("./helpers");

module.exports = {
  create(req, res) {
    helperControllers.create(res, Patient, req.body);
  },
  list(req, res) {
    helperControllers.list(res, Patient);
  },
  retrieve(req, res) {
    helperControllers.retrieve(res, Patient, req.params.patientId);
  },
  update(req, res) {
    helperControllers.update(res, Patient, req.body, req.params.patientId);
  },
  destroy(req, res) {
    helperControllers.destroy(res, Patient, req.params.patientId);
  },
  destroyAll(req, res) {
    helperControllers.destroyAll(res, Patient);
  },
};
