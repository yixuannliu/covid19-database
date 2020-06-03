const express = require("express");
const router = express.Router();
const calculationsController = require("../controllers").calculations;

// GET request
router.get(
  "/count/patients/genders",
  calculationsController.countPatientsByGender
);

router.get(
  "/count/patients/healthStatus/isRecovered",
  calculationsController.countRecoveredPatientsByRegion
);

module.exports = router;
