const express = require("express");
const router = express.Router();
const occupationsController = require("../controllers").occupations;

// GET request
router.get("/", occupationsController.list);
router.get("/:occupationId", occupationsController.retrieve);

module.exports = router;
