const Region = require("../models").Region;
const helperControllers = require("./helpers");

module.exports = {
  list(req, res) {
    helperControllers.list(req, res, Region);
  },
  retrieve(req, res) {
    helperControllers.retrieve(req, res, Region, req.params.regionId);
  },
};
