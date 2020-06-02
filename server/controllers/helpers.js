module.exports = {
  create(req, res, model) {
    return model
      .create(req.body)
      .then((row) => res.status(201).send(row))
      .catch((error) => res.status(400).send(error));
  },
  list(req, res, model) {
    return model
      .findAll({ order: [["id", "ASC"]] })
      .then((rows) => res.status(200).send(rows))
      .catch((error) => res.status(400).send(error));
  },
  retrieve(req, res, model, id) {
    return model
      .findByPk(id)
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
  update(req, res, model, id) {
    return model
      .update(req.body, {
        returning: true,
        where: { id },
      })
      .then(([rowsUpdate, [updatedRow]]) => res.status(200).send(updatedRow))
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res, model, id) {
    return model
      .destroy({ where: { id } })
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
    return model
      .destroy({ where: {} })
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
