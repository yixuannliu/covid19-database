const HealthStatus = require("../models").HealthStatus;

module.exports = {
  create(req, res) {
    return HealthStatus.create({ ...req.body, patientId: req.params.patientId })
      .then((row) => res.status(201).send(row))
      .catch((error) => res.status(400).send(error));
  },
  list(req, res) {
    return HealthStatus.findAll({ order: [["id", "ASC"]] })
      .then((rows) => res.status(200).send(rows))
      .catch((error) => res.status(400).send(error));
  },
  retrieve(req, res) {
    return HealthStatus.findOne({
      where: {
        patientId: req.params.patientId,
      },
    })
      .then((row) => {
        if (!row) {
          return res.status(404).send({
            message: `Row with id ${id} is not found.`,
          });
        }
        return res.status(200).send(row);
      })
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    return HealthStatus.update(req.body, {
      returning: true,
      where: { patientId: req.params.patientId },
    })
      .then(([rowsUpdate, [updatedRow]]) => res.status(200).send(updatedRow))
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return HealthStatus.destroy({ where: { patientId: req.params.patientId } })
      .then((destroyedRow) => {
        if (!destroyedRow) {
          return res.status(404).send({
            message: `Row with id ${id} is not found.`,
          });
        }
        return res.status(204).send();
      })
      .catch((error) => res.status(400).send(error));
  },
  destroyAll(req, res, model) {
    return HealthStatus.destroy({ where: {} })
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
