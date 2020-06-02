const Hospital = require("../models").Hospital;

module.exports = {
  create(req, res) {
    return Hospital.create(req.body)
      .then((hospital) => res.status(201).send(hospital))
      .catch((error) => res.status(400).send(error));
  },
  list(req, res) {
    return Hospital.findAll({ order: [["id", "ASC"]] })
      .then((hospitals) => res.status(200).send(hospitals))
      .catch((error) => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Hospital.findByPk(req.params.hospitalId)
      .then((hospital) => {
        if (!hospital) {
          return res.status(404).send({
            message: `Hospital with id ${req.params.hospitalId} is not found.`,
          });
        }
        return res.status(200).send(hospital);
      })
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    return Hospital.update(req.body, {
      returning: true,
      where: { id: req.params.hospitalId },
    })
      .then(([rowsUpdate, [updatedHospital]]) =>
        res.status(200).send(updatedHospital)
      )
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return Hospital.destroy({ where: { id: req.params.hospitalId } })
      .then((destroyedRow) => {
        if (!destroyedRow) {
          return res.status(404).send({
            message: `Hospital with id ${req.params.hospitalId} is not found.`,
          });
        }
        return res.status(204).send();
      })
      .catch((error) => res.status(400).send(error));
  },
  destroyAll(req, res) {
    return Hospital.destroy({ where: {} })
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
