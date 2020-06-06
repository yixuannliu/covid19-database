const express = require("express");
const router = express.Router();
const patientsController = require("../controllers").patients;

const Joi = require("@hapi/joi");
const { validateBody } = require("../middleware/validate");

const PATIENT_SCHEMA = Joi.object({
  age: Joi.number().required(),
  genderId: Joi.number(),
  occupationId: Joi.number(),
  regionId: Joi.number().required(),
  hospitalId: Joi.number(),
});

// GET request
router.get("/", patientsController.list);
router.get("/:patientId", patientsController.retrieve);

// CREATE request
router.post("/", validateBody(PATIENT_SCHEMA), patientsController.create);

// UPDATE request
router.put(
  "/:patientId",
  validateBody(PATIENT_SCHEMA),
  patientsController.update
);

// DELETE request
router.delete("/:patientId", patientsController.destroy);
router.delete("/", patientsController.destroyAll);

module.exports = router;
