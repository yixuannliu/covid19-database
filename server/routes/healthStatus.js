const express = require("express");
const router = express.Router();
const healthStatusController = require("../controllers").healthStatus;

// GET request
router.get("/", healthStatusController.list);
router.get("/:patientId", healthStatusController.retrieve);

// CREATE request
router.post("/", healthStatusController.create);

// UPDATE request
router.put("/:patientId", healthStatusController.update);

// DELETE request
router.delete("/:patientId", healthStatusController.destroy);
router.delete("/", healthStatusController.destroyAll);

module.exports = router;
