const Region = require("../models").Region;

module.exports = {
  list(req, res) {
    return Region.findAll()
      .then((regions) => res.status(200).send(regions))
      .catch((error) => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Region.findByPk(req.params.regionId)
      .then((region) => {
        if (!region) {
          return res.status(404).send({
            message: `Region with index ${req.params.regionId} is not found.`,
          });
        }
        return res.status(200).send(region);
      })
      .catch((error) => res.status(400).send(error));
  },
};
