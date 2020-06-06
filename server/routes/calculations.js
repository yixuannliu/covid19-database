const express = require("express");
const router = express.Router();
const calculationsController = require("../controllers").calculations;

const Joi = require("@hapi/joi");
const { validateQuery } = require("../middleware/validate");

const { GENDERS } = require("../utils/constants");

const GENDER_COUNTS_SCHEMA = Joi.object({
  genderId: Joi.number(),
  genderName: Joi.string().valid(
    GENDERS.MALE,
    GENDERS.FEMALE,
    GENDERS.NOT_STATED
  ),
});

const HEALTH_STATUS_COUNT_SCHEMA = Joi.object({
  regionId: Joi.number(),
});

// GET request
router.get(
  "/patients/count/gender",
  validateQuery(GENDER_COUNTS_SCHEMA),
  calculationsController.countPatientsByGender
);

router.get(
  "/patients/count/healthStatus/isRecovered",
  validateQuery(HEALTH_STATUS_COUNT_SCHEMA),
  calculationsController.countRecoveredPatientsByRegion
);

module.exports = router;
