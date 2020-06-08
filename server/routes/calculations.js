const express = require("express");
const router = express.Router();
const calculationsController = require("../controllers").calculations;

const Joi = require("@hapi/joi");
const { validateQuery } = require("../middleware/validate");

const { GENDERS, PATIENT_LOOKUP_TABLES } = require("../utils/constants");

const PATIENT_COUNT_SCHEMA = Joi.object({
  filterType: Joi.string()
    .valid(
      PATIENT_LOOKUP_TABLES.GENDER,
      PATIENT_LOOKUP_TABLES.OCCUPATION,
      PATIENT_LOOKUP_TABLES.REGION
    )
    .required(),
  filterId: Joi.number(),
  filterName: Joi.string().when("filterType", {
    is: PATIENT_LOOKUP_TABLES.GENDER,
    then: Joi.string().valid(GENDERS.MALE, GENDERS.FEMALE, GENDERS.NOT_STATED),
  }),
});

const HEALTH_STATUS_COUNT_SCHEMA = Joi.object({
  regionId: Joi.number(),
});

// GET request
router.get(
  "/patients/count",
  validateQuery(PATIENT_COUNT_SCHEMA),
  calculationsController.countPatientsByFilterType
);

router.get(
  "/patients/count/healthStatus/isRecovered",
  validateQuery(HEALTH_STATUS_COUNT_SCHEMA),
  calculationsController.countRecoveredPatientsByRegion
);

module.exports = router;
