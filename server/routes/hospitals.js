const express = require("express");
const router = express.Router();
const hospitalsController = require("../controllers").hospitals;

const Joi = require("@hapi/joi");
const { validateBody } = require("../middleware/validate");

const HOSPITAL_SCHEMA = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  capacity: Joi.number().required(),
  ventilator: Joi.number().required(),
});

// GET request
router.get("/", hospitalsController.list);
router.get("/:hospitalId", hospitalsController.retrieve);

// CREATE request
router.post("/", validateBody(HOSPITAL_SCHEMA), hospitalsController.create);

// UPDATE request
router.put(
  "/:hospitalId",
  validateBody(HOSPITAL_SCHEMA),
  hospitalsController.update
);

// DELETE request
router.delete("/:hospitalId", hospitalsController.destroy);
router.delete("/", hospitalsController.destroyAll);

module.exports = router;
