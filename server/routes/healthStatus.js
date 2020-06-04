const express = require("express");
const router = express.Router();
const healthStatusController = require("../controllers").healthStatus;

const Joi = require("@hapi/joi");
const { validateBody } = require("../middleware/validate");

const HEALTH_STATUS_SCHEMA = Joi.object({
  onsetWeekOfSymptoms: Joi.number().required(),
  isRecovered: Joi.boolean().required(),
  recoveryWeek: Joi.number().required(),
  death: Joi.boolean().required(),
});

// GET request
router.get("/healthStatus", healthStatusController.list);
router.get(
  "/patients/:patientId/healthStatus",
  healthStatusController.retrieve
);

// CREATE request
router.post(
  "/patients/:patientId/healthStatus",
  validateBody(HEALTH_STATUS_SCHEMA),
  healthStatusController.create
);

// UPDATE request
router.put(
  "/patients/:patientId/healthStatus",
  validateBody(HEALTH_STATUS_SCHEMA),
  healthStatusController.update
);

// DELETE request
router.delete(
  "/patients/:patientId/healthStatus",
  healthStatusController.destroy
);
router.delete("/healthStatus", healthStatusController.destroyAll);

module.exports = router;
