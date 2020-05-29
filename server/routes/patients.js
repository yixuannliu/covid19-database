const express = require("express");
const router = express.Router();
const sequalize = require("../config/database");
const Patient = require("../models/patient");
const patientsController = require("../controllers").patients;

// GET request
router.get("/", patientsController.list);
router.get("/:patientId", patientsController.retrieve);

// CREATE request
router.post("/", patientsController.create);

// UPDATE request
router.put("/:patientId", patientsController.update);

module.exports = router;
