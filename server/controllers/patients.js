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
  list(req, res) {
    return Patient.findAll()
      .then((patients) => res.status(200).send(patients))
      .catch((error) => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Patient.findByPk(req.params.patientId)
      .then((patient) => {
        if (!patient) {
          return res.status(404).send({
            message: `Patient with id ${req.params.patientId} is not found`,
          });
        }
        return res.status(200).send(patient);
      })
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    const { age, genderId, occupationId, regionId } = req.body;
    return Patient.update(
      {
        age,
        genderId,
        occupationId,
        regionId,
      },
      { returning: true, where: { id: req.params.patientId } }
    )
      .then(([rowsUpdate, [updatedPatient]]) =>
        res.status(200).send(updatedPatient)
      )
      .catch((error) => res.status(400).send(error));
  },
};
