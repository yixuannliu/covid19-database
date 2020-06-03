const express = require("express");
const router = express.Router();
const calculationsController = require("../controllers").calculations;

// GET request
router.get(
  "/count/patients/genders",
  calculationsController.countPatientsByGenderId
);

module.exports = router;
