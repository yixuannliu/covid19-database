const Occupation = require("../models").Occupation;
const helperControllers = require("./helpers");

module.exports = {
  list(req, res) {
    helperControllers.list(req, res, Occupation);
  },
  retrieve(req, res) {
    helperControllers.retrieve(req, res, Occupation, req.params.occupationId);
  },
};
