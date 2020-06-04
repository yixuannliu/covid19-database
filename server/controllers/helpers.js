module.exports = {
  create(res, model, requestBody) {
    return model
      .create(requestBody)
      .then((row) => res.status(201).send(row))
      .catch((error) => res.status(400).send(error));
  },
  list(res, model) {
    return model
      .findAll({ order: [["id", "ASC"]] })
      .then((rows) => res.status(200).send(rows))
      .catch((error) => res.status(400).send(error));
  },
  retrieve(res, model, id) {
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
  retrieveByColumn(res, model, searchTarget) {
    return model
      .findOne({
        where: searchTarget,
      })
      .then((row) => {
        if (!row) {
          return res.status(404).send({
            message: "Not found",
          });
        }
        return res.status(200).send(row);
      })
      .catch((error) => res.status(400).send(error));
  },
  update(res, model, requestBody, id) {
    return model
      .update(requestBody, {
        returning: true,
        where: { id },
      })
      .then(([rowsUpdate, [updatedRow]]) => {
        if (!rowsUpdate) {
          return res.status(404).send({
            message: `Row with id ${id} does not exist.`,
          });
        }
        return res.status(200).send(updatedRow);
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(res, model, id) {
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
  destroyAll(res, model) {
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
