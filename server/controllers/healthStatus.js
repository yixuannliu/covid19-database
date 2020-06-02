const HealthStatus = require("../models").HealthStatus;
const helperControllers = require("./helpers");

module.exports = {
  create(req, res) {
    helperControllers.create(req, res, HealthStatus);
  },
  list(req, res) {
    helperControllers.list(req, res, HealthStatus);
  },
  retrieve(req, res) {
    helperControllers.retrieve(
      req,
      res,
      HealthStatus,
      req.params.healthStatusId
    );
  },
  update(req, res) {
    helperControllers.update(req, res, HealthStatus, req.params.healthStatusId);
  },
  destroy(req, res) {
    helperControllers.destroy(
      req,
      res,
      HealthStatus,
      req.params.healthStatusId
    );
  },
  destroyAll(req, res) {
    helperControllers.destroyAll(req, res, HealthStatus);
  },
};
