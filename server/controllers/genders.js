const Gender = require("../models").Gender;
const helperControllers = require("./helpers");

module.exports = {
  list(req, res) {
    helperControllers.list(req, res, Gender);
  },
  retrieve(req, res) {
    helperControllers.retrieve(req, res, Gender, req.params.genderId);
  },
};
