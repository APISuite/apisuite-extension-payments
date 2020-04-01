const Joi = require("@hapi/joi");

const buildSchema = (/* server */) => {
  const schema = {};

  //
  // === Incoming requests ===
  //

  schema.interceptRequest = Joi.object().keys({
    interceptor: Joi.object().keys({
      service: Joi.string().required(),
      route: Joi.string().required(),
      lifecycle: Joi.string().required(),
      consumerGroup: Joi.string().required()
    }),
    request: Joi.object().keys({
      method: Joi.string().required(),
      url: Joi.array().required(),
      headers: Joi.string().required(),
      body: Joi.string().required()
    })
  });

  //
  // === Outgoing payload ===
  //

  //
  // Base object schemas
  //

  schema.consumeFundsInfo = Joi.object().keys({
    hasFunds: Joi.boolean().required()
  });

  //
  // Actual response schemas
  //

  schema.consumeFundsResponse = Joi.object().keys({
    data: schema.consumeFundsInfo
  });

  return schema;
};

module.exports = buildSchema;
