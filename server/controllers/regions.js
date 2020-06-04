const Region = require("../models").Region;
const helperControllers = require("./helpers");

module.exports = {
  list(req, res) {
    helperControllers.list(res, Region);
  },
  retrieve(req, res) {
    helperControllers.retrieve(res, Region, req.params.regionId);
  },
};
