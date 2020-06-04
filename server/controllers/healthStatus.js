const HealthStatus = require("../models").HealthStatus;
const helperControllers = require("./helpers");

module.exports = {
  create(req, res) {
    helperControllers.create(res, HealthStatus, {
      ...req.body,
      patientId: req.params.patientId,
    });
  },
  list(req, res) {
    helperControllers.list(res, HealthStatus);
  },
  retrieve(req, res) {
    helperControllers.retrieveByColumn(res, HealthStatus, {
      patientId: req.params.patientId,
    });
  },
  update(req, res) {
    helperControllers.update(res, HealthStatus, req.body, req.params.patientId);
  },
  destroy(req, res) {
    helperControllers.destroy(res, HealthStatus, req.params.patientId);
  },
  destroyAll(req, res) {
    helperControllers.destroyAll(res, HealthStatus);
  },
};
