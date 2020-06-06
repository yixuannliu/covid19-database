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
        .then((number) =>
          res.status(200).send([
            {
              genderId,
              patientCount: number,
            },
          ])
        )
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
        .then((number) =>
          res.status(200).send([{ genderName, patientCount: number }])
        )
        .catch((error) => res.status(400).send(error));
    }
    return Patient.findAll({
      raw: true,
      attributes: [
        [sequelize.col("gender.id"), "genderId"],
        [sequelize.col("gender.name"), "genderName"],
        [sequelize.fn("count", sequelize.col("patient.id")), "patientCount"],
      ],
      include: [
        {
          model: Gender,
          attributes: [],
        },
      ],
      group: ["gender.id"],
    })
      .then((rows) => res.status(200).send(rows))
      .catch((error) => res.status(400).send(error));
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
        .then((number) =>
          res.status(200).send([{ regionId, patientCount: number }])
        )
        .catch((error) => res.status(400).send(error));
    }
    return Patient.findAll({
      raw: true,
      attributes: [
        "regionId",
        [sequelize.fn("count", sequelize.col("patient.id")), "patientCount"],
      ],
      include: [
        {
          model: HealthStatus,
          attributes: [],
          where: { isRecovered: true },
        },
      ],
      group: ["regionId"],
    })
      .then((rows) => res.status(200).send(rows))
      .catch((error) => res.status(400).send(error));
  },
};
