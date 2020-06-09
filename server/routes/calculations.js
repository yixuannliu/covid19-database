const express = require("express");
const router = express.Router();
const calculationsController = require("../controllers").calculations;

const Joi = require("@hapi/joi");
const { validateQuery } = require("../middleware/validate");

const { GENDERS, PATIENT_LOOKUP_TABLES } = require("../utils/constants");

// base schema
const PATIENT_COUNT_SCHEMA = Joi.object({
  filterType: Joi.string().valid(
    PATIENT_LOOKUP_TABLES.GENDER,
    PATIENT_LOOKUP_TABLES.OCCUPATION,
    PATIENT_LOOKUP_TABLES.REGION,
    "hospital"
  ),
  filterId: Joi.number(),
  filterName: Joi.string().when("filterType", {
    is: PATIENT_LOOKUP_TABLES.GENDER,
    then: Joi.string().valid(GENDERS.MALE, GENDERS.FEMALE, GENDERS.NOT_STATED),
  }),
});

const HEALTH_STATUS_COUNT_SCHEMA = PATIENT_COUNT_SCHEMA.keys({
  isRecovered: Joi.boolean(),
  maxRecoveryWeek: Joi.number(),
  maxOnsetWeekOfSymptoms: Joi.number(),
  death: Joi.boolean(),
});

const SYMPTOM_COUNT_SCHEMA = PATIENT_COUNT_SCHEMA.keys({
  isAsymptomatic: Joi.boolean(),
  hasCough: Joi.boolean(),
  hasFever: Joi.boolean(),
  hasHeadache: Joi.boolean(),
  hasWeakness: Joi.boolean(),
});

const HOSPITAL_COUNT_SCHEMA = PATIENT_COUNT_SCHEMA.keys({
  hospitalId: Joi.number(),
  hospitalName: Joi.string(),
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
  calculationsController.countPatientsByHealthStatus
);

router.get(
  "/patients/symptoms/count",
  validateQuery(SYMPTOM_COUNT_SCHEMA),
  calculationsController.countPatientsBySymptom
);

router.get(
  "/patients/hospitals/count",
  validateQuery(HOSPITAL_COUNT_SCHEMA),
  calculationsController.countPatientsByHospital
);

module.exports = router;
