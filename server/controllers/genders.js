const Gender = require("../models").Gender;
const helperControllers = require("./helpers");

module.exports = {
  list(req, res) {
    helperControllers.list(res, Gender);
  },
  retrieve(req, res) {
    helperControllers.retrieve(res, Gender, req.params.genderId);
  },
};
