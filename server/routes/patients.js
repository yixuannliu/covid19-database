const express = require("express");
const router = express.Router();
const patientsController = require("../controllers").patients;

// GET request
router.get("/", patientsController.list);
router.get("/:patientId", patientsController.retrieve);

// CREATE request
router.post("/", patientsController.create);

// UPDATE request
router.put("/:patientId", patientsController.update);

// DELETE request
router.delete("/:patientId", patientsController.destroy);
router.delete("/", patientsController.destroyAll);

module.exports = router;
