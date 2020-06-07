const express = require("express");
const router = express.Router();
const symptomsController = require("../controllers").symptoms;

const Joi = require("@hapi/joi");
const { validateBody } = require("../middleware/validate");

const SYMPTOM_SCHEMA = Joi.object({
  isAsymptomatic: Joi.boolean().required(),
  hasCough: Joi.boolean().required(),
  hasFever: Joi.boolean().required(),
  hasHeadache: Joi.boolean().required(),
  hasWeakness: Joi.boolean().required(),
});

// GET request
router.get("/symptoms", symptomsController.list);
router.get("/patients/:patientId/symptoms", symptomsController.retrieve);

// CREATE request
router.post(
  "/patients/:patientId/symptoms",
  validateBody(SYMPTOM_SCHEMA),
  symptomsController.create
);

// UPDATE request
router.put(
  "/patients/:patientId/symptoms",
  validateBody(SYMPTOM_SCHEMA),
  symptomsController.update
);

// DELETE request
router.delete("/patients/:patientId/symptoms", symptomsController.destroy);
router.delete("/symptoms", symptomsController.destroyAll);

module.exports = router;
