const express = require("express");
const router = express.Router();
const sequalize = require("../config/database");
const Patient = require("../models/patient");
const patientsController = require("../controllers").patients;

// GET patients list
router.get("/", (req, res) =>
  Patient.findAll()
    .then((patients) => {
      console.log(patients);
      res.sendStatus(200);
    })
    .catch((err) => console.log(err))
);

// CREATE/ADD patient
router.post("/", patientsController.create);

module.exports = router;
