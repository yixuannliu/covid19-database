const express = require("express");
const router = express.Router();
const gendersController = require("../controllers").genders;

// GET request
router.get("/", gendersController.list);
router.get("/:genderId", gendersController.retrieve);

module.exports = router;
