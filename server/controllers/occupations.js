const Occupation = require("../models").Occupation;
const helperControllers = require("./helpers");

module.exports = {
  list(req, res) {
    helperControllers.list(res, Occupation);
  },
  retrieve(req, res) {
    helperControllers.retrieve(res, Occupation, req.params.occupationId);
  },
};
