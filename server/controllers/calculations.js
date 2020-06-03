const sequelize = require("../config/database");

const Patient = require("../models").Patient;
const Gender = require("../models").Gender;
const Region = require("../models").Region;
const HealthStatus = require("../models").HealthStatus;

module.exports = {
  countPatientsByGender(req, res) {
    const { genderId, genderName } = req.query;
    if (genderId) {
      return Patient.count({
        where: { genderId: genderId },
      })
        .then((number) => res.status(200).send({ number }))
        .catch((error) => res.status(400).send(error));
    }
    if (genderName) {
      return Patient.count({
        include: [
          {
            model: Gender,
            attributes: [],
            where: { name: genderName },
          },
        ],
      })
        .then((number) => res.status(200).send({ number }))
        .catch((error) => res.status(400).send(error));
    }
    return res.status(400).send({ message: "Please attach query params" });
  },
  countRecoveredPatientsByRegion(req, res) {
    const { regionId } = req.query;
    if (regionId) {
      return Patient.count({
        include: [
          {
            model: HealthStatus,
            attributes: [],
            where: { isRecovered: true },
          },
        ],
        where: { regionId },
      })
        .then((number) => res.status(200).send({ number }))
        .catch((error) => res.status(400).send(error));
    }
    return res.status(400).send({ message: "Please attach query params" });
  },
};
