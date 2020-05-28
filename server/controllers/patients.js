const Patient = require("../models/patient");

module.exports = {
  create(req, res) {
    const { id, age, genderId, occupationId, regionId } = req.body;
    return Patient.create({
      id,
      age,
      genderId,
      occupationId,
      regionId,
    })
      .then((patient) => res.status(201).send(patient))
      .catch((error) => res.status(400).send(error));
  },
};
