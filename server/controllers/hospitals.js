const Hospital = require("../models").Hospital;
const helperControllers = require("./helpers");

module.exports = {
  create(req, res) {
    helperControllers.create(res, Hospital, req.body);
  },
  list(req, res) {
    helperControllers.list(res, Hospital);
  },
  retrieve(req, res) {
    helperControllers.retrieve(res, Hospital, req.params.hospitalId);
  },
  update(req, res) {
    helperControllers.update(res, Hospital, req.body, req.params.hospitalId);
  },
  destroy(req, res) {
    helperControllers.destroy(res, Hospital, req.params.hospitalId);
  },
  destroyAll(req, res) {
    helperControllers.destroyAll(res, Hospital);
  },
};
