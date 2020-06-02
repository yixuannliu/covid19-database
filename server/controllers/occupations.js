const Occupation = require("../models").Occupation;

module.exports = {
  list(req, res) {
    return Occupation.findAll()
      .then((occupations) => res.status(200).send(occupations))
      .catch((error) => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Occupation.findByPk(req.params.occupationId)
      .then((occupation) => {
        if (!occupation) {
          return res.status(404).send({
            message: `Occupation with index ${req.params.occupationId} is not found.`,
          });
        }
        return res.status(200).send(occupation);
      })
      .catch((error) => res.status(400).send(error));
  },
};
