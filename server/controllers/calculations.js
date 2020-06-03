const sequelize = require("../config/database");

const Patient = require("../models").Patient;
const Gender = require("../models").Gender;

module.exports = {
  countPatientsByGender(req, res) {
    const { genderId, genderName } = req.query;
    if (genderId) {
      return Patient.count({
        where: { genderId: req.query.genderId },
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
            where: { name: req.query.genderName },
          },
        ],
        group: ["patient.genderId"],
      })
        .then((number) => res.status(200).send({ number }))
        .catch((error) => res.status(400).send(error));
    }
    return res.status(400).send({ message: "Please attach query params" });
  },
};
