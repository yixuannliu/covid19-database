const sequelize = require("../config/database");

const Patient = require("../models").Patient;
const Gender = require("../models").Gender;
const Region = require("../models").Region;
const HealthStatus = require("../models").HealthStatus;

const getFormattedPatientCount = (array) => {
  if (array.length === 0) {
    return {};
  }
  return array.reduce((acc, curr) => {
    const { name, patientCount } = curr;
    acc[name] = patientCount;
    return acc;
  }, {});
};

module.exports = {
  countPatientsByGender(req, res) {
    const { id, name } = req.query;
    const whereClause = id ? { id } : name ? { name } : {};
    return Patient.findAll({
      raw: true,
      attributes: [
        "gender.name",
        [sequelize.fn("count", sequelize.col("patient.id")), "patientCount"],
      ],
      include: [
        {
          model: Gender,
          attributes: [],
          where: whereClause,
        },
      ],
      group: ["gender.id"],
    })
      .then((rows) => res.status(200).send(getFormattedPatientCount(rows)))
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
