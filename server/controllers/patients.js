const Patient = require("../models/patient");

module.exports = {
  create(req, res) {
    return Patient.create(req.body)
      .then((patient) => res.status(201).send(patient))
      .catch((error) => res.status(400).send(error));
  },
  list(req, res) {
    return Patient.findAll({ order: [["id", "ASC"]] })
      .then((patients) => res.status(200).send(patients))
      .catch((error) => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Patient.findByPk(req.params.patientId)
      .then((patient) => {
        if (!patient) {
          return res.status(404).send({
            message: `Patient with id ${req.params.patientId} is not found.`,
          });
        }
        return res.status(200).send(patient);
      })
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    return Patient.update(req.body, {
      returning: true,
      where: { id: req.params.patientId },
    })
      .then(([rowsUpdate, [updatedPatient]]) =>
        res.status(200).send(updatedPatient)
      )
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return Patient.destroy({ where: { id: req.params.patientId } })
      .then((destroyedRow) => {
        if (!destroyedRow) {
          return res.status(404).send({
            message: `Patient with id ${req.params.patientId} is not found.`,
          });
        }
        return res.status(204).send();
      })
      .catch((error) => res.status(400).send(error));
  },
  destroyAll(req, res) {
    return Patient.destroy({ where: {} })
      .then((destroyedRow) => {
        if (!destroyedRow) {
          return res.status(404).send({
            message: "Cannot delete all rows",
          });
        }
        return res.status(204).send();
      })
      .catch((error) => res.status(400).send(error));
  },
};
