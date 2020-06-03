const express = require("express");
const router = express.Router();
const healthStatusController = require("../controllers").healthStatus;

// GET request
router.get("/healthStatus", healthStatusController.list);
router.get(
  "/patients/:patientId/healthStatus",
  healthStatusController.retrieve
);

// CREATE request
router.post("/patients/:patientId/healthStatus", healthStatusController.create);

// UPDATE request
router.put("/patients/:patientId/healthStatus", healthStatusController.update);

// DELETE request
router.delete(
  "/patients/:patientId/healthStatus",
  healthStatusController.destroy
);
router.delete("/healthStatus", healthStatusController.destroyAll);

module.exports = router;
