const Joi = require("@hapi/joi");

const createValidateMiddleware = (schema, key) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[key]);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };
};

module.exports = {
  validateBody(schema) {
    return createValidateMiddleware(schema, "body");
  },
  validateQuery(schema) {
    return createValidateMiddleware(schema, "query");
  },
};
