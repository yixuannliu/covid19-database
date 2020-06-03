const sequelize = require("../config/database");

const Patient = require("../models").Patient;
const Gender = require("../models").Gender;

module.exports = {
  countPatientsByGenderId(req, res) {
    if (!req.query.genderId) {
      return res.status(400).send({ message: "Please attach query params" });
    }
    return Patient.count({
      where: { genderId: req.query.genderId },
    })
      .then((number) => res.status(200).send({ number }))
      .catch((error) => res.status(400).send(error));
  },
  countPatientsByGenderName(req, res) {
    if (!req.query.genderName) {
      return res.status(400).send({ message: "Please attach query params" });
    }
    // return Patient.findAll({
    //     attributes: ['id', [sequelize.fn('count', sequelize.col('patients.id')), 'patientCount']],
    //     include: [{ attributes: [], model: Patient }],
    //     group: ['model.id']
    //   })
    //   .then((number) => res.status(200).send({ number }))
    //   .catch((error) => res.status(400).send(error));
  },
};
