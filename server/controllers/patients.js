const Patient = require("../models").Patient;
const helperControllers = require("./helpers");

module.exports = {
  create(req, res) {
    helperControllers.create(req, res, Patient);
  },
  list(req, res) {
    helperControllers.list(req, res, Patient);
  },
  retrieve(req, res) {
    helperControllers.retrieve(req, res, Patient, req.params.patientId);
  },
  update(req, res) {
    helperControllers.update(req, res, Patient, req.params.patientId);
  },
  destroy(req, res) {
    helperControllers.destroy(req, res, Patient, req.params.patientId);
  },
  destroyAll(req, res) {
    helperControllers.destroyAll(req, res, Patient);
  },
};
