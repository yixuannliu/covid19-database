const { Op } = require("sequelize");
const sequelize = require("../config/database");

const Patient = require("../models").Patient;
const HealthStatus = require("../models").HealthStatus;

const {
  getFormattedPatientCount,
  getWhereClause,
  getLeftJoinModel,
} = require("./calculationsHelpers");

module.exports = {
  countPatientsByFilterType(req, res) {
    const { filterType, filterId, filterName } = req.query;
    if (!filterType) {
      return (
        Patient.findAll({
          attributes: [
            [sequelize.fn("count", sequelize.col("id")), "patientCount"],
          ],
        })
          // [{"patientCount": "1"}] how to deal with result data if no filter applies
          .then((rows) => res.status(200).send(rows))
          .catch((error) => res.status(400).send(error))
      );
    }

    const whereClause = getWhereClause(filterId, filterName);
    const leftJoinModel = getLeftJoinModel(filterType);

    return Patient.findAll({
      raw: true,
      attributes: [
        `${filterType}.name`,
        [sequelize.fn("count", sequelize.col("patient.id")), "patientCount"],
      ],
      include: [
        {
          model: leftJoinModel,
          attributes: [],
          where: whereClause,
        },
      ],
      group: [`${filterType}.id`],
    })
      .then((rows) => res.status(200).send(getFormattedPatientCount(rows)))
      .catch((error) => res.status(400).send(error));
  },
  countPatientsHealthStatus(req, res) {
    const {
      filterType,
      filterId,
      filterName,
      isRecovered,
      maxRecoveryWeek,
    } = req.query;

    if (!filterType) {
      return (
        Patient.findAll({
          raw: true,
          attributes: [
            [
              sequelize.fn("count", sequelize.col("patient.id")),
              "patientCount",
            ],
          ],
          include: [
            {
              model: HealthStatus,
              attributes: [],
              where: {
                // TODO: different where clause
                recoveryWeek: {
                  [Op.lte]: maxRecoveryWeek,
                },
              },
            },
          ],
        })
          // [{"patientCount": "1"}] how to deal with result data if no filter applies
          .then((rows) => res.status(200).send(rows))
          .catch((error) => res.status(400).send(error))
      );
    }

    const whereClause = getWhereClause(filterId, filterName);
    const leftJoinModel = getLeftJoinModel(filterType);

    return Patient.findAll({
      raw: true,
      attributes: [
        `${filterType}.name`,
        [sequelize.fn("count", sequelize.col("patient.id")), "patientCount"],
      ],
      include: [
        {
          model: HealthStatus,
          attributes: [],
          where: {
            // TODO: different where clause
            recoveryWeek: {
              [Op.lte]: maxRecoveryWeek,
            },
          },
        },
        {
          model: leftJoinModel,
          attributes: [],
          where: whereClause,
        },
      ],
      group: [`${filterType}.id`],
    })
      .then((rows) => res.status(200).send(getFormattedPatientCount(rows)))
      .catch((error) => res.status(400).send(error));
  },
};
