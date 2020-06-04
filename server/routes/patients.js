const express = require("express");
const router = express.Router();
const patientsController = require("../controllers").patients;

const Joi = require("@hapi/joi");
const { validateBody } = require("../middleware/validate");

const PATIENTS_SCHEMA = Joi.object({
  age: Joi.number().required(),
  genderId: Joi.number().required(),
  occupationId: Joi.number().required(),
  regionId: Joi.number().required(),
  hospitalId: Joi.number().required(),
});

// GET request
router.get("/", patientsController.list);
router.get("/:patientId", patientsController.retrieve);

// CREATE request
router.post("/", validateBody(PATIENTS_SCHEMA), patientsController.create);

// UPDATE request
router.put(
  "/:patientId",
  validateBody(PATIENTS_SCHEMA),
  patientsController.update
);

// DELETE request
router.delete("/:patientId", patientsController.destroy);
router.delete("/", patientsController.destroyAll);

module.exports = router;
