const Gender = require("../models").Gender;

module.exports = {
  list(req, res) {
    return Gender.findAll()
      .then((genders) => res.status(200).send(genders))
      .catch((error) => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Gender.findByPk(req.params.genderId)
      .then((gender) => {
        if (!gender) {
          return res.status(404).send({
            message: `Gender with index ${req.params.genderId} is not found.`,
          });
        }
        return res.status(200).send(gender);
      })
      .catch((error) => res.status(400).send(error));
  },
};
