const express = require("express");
const router = express.Router();
const regionsController = require("../controllers").regions;

// GET request
router.get("/", regionsController.list);
router.get("/:regionId", regionsController.retrieve);

module.exports = router;
