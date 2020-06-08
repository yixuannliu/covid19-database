const express = require("express");
const router = express.Router();
const calculationsController = require("../controllers").calculations;

const Joi = require("@hapi/joi");
const { validateQuery } = require("../middleware/validate");

const { GENDERS, PATIENT_LOOKUP_TABLES } = require("../utils/constants");

const PATIENT_COUNT_SCHEMA = Joi.object({
  filterType: Joi.string().valid(
    PATIENT_LOOKUP_TABLES.GENDER,
    PATIENT_LOOKUP_TABLES.OCCUPATION,
    PATIENT_LOOKUP_TABLES.REGION
  ),
  filterId: Joi.number(),
  filterName: Joi.string().when("filterType", {
    is: PATIENT_LOOKUP_TABLES.GENDER,
    then: Joi.string().valid(GENDERS.MALE, GENDERS.FEMALE, GENDERS.NOT_STATED),
  }),
});

const HEALTH_STATUS_COUNT_SCHEMA = Joi.object({
  filterType: Joi.string().valid(
    PATIENT_LOOKUP_TABLES.GENDER,
    PATIENT_LOOKUP_TABLES.OCCUPATION,
    PATIENT_LOOKUP_TABLES.REGION
  ),
  filterId: Joi.number(),
  filterName: Joi.string().when("filterType", {
    is: PATIENT_LOOKUP_TABLES.GENDER,
    then: Joi.string().valid(GENDERS.MALE, GENDERS.FEMALE, GENDERS.NOT_STATED),
  }),
  isRecovered: Joi.boolean(),
  maxRecoveryWeek: Joi.number(),
  maxOnsetWeekOfSymptoms: Joi.number(),
  death: Joi.boolean(),
});

// GET request
router.get(
  "/patients/count",
  validateQuery(PATIENT_COUNT_SCHEMA),
  calculationsController.countPatientsByFilterType
);

router.get(
  "/patients/healthStatus/count",
  validateQuery(HEALTH_STATUS_COUNT_SCHEMA),
  calculationsController.countPatientsHealthStatus
);

module.exports = router;
