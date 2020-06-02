const express = require("express");
const router = express.Router();
const hospitalsController = require("../controllers").hospital;

// GET request
router.get("/", hospitalsController.list);
router.get("/:hospitalId", hospitalsController.retrieve);

// CREATE request
router.post("/", hospitalsController.create);

// UPDATE request
router.put("/:hospitalId", hospitalsController.update);

// DELETE request
router.delete("/:hospitalId", hospitalsController.destroy);
router.delete("/", hospitalsController.destroyAll);

module.exports = router;
