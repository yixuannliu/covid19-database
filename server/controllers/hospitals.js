const Hospital = require("../models").Hospital;
const helperControllers = require("./helpers");

module.exports = {
  create(req, res) {
    helperControllers.create(req, res, Hospital);
  },
  list(req, res) {
    helperControllers.list(req, res, Hospital);
  },
  retrieve(req, res) {
    helperControllers.retrieve(req, res, Hospital, req.params.hospitalId);
  },
  update(req, res) {
    helperControllers.update(req, res, Hospital, req.params.hospitalId);
  },
  destroy(req, res) {
    helperControllers.destroy(req, res, Hospital, req.params.hospitalId);
  },
  destroyAll(req, res) {
    helperControllers.destroyAll(req, res, Hospital);
  },
};
