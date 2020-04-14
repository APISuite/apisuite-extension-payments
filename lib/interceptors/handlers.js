const Boom = require("@hapi/boom");
const { getByKey } = require("../helpers/interceptors");
const InterceptionHandlers = require("../interception-handlers");

const handlers = {};

/**
 * The handler for the following endpoint:
 *
 * POST `/v1/intercept`
 */
handlers.intercept = async (request, h) => {
  const { interceptorKey } = request.payload;

  const interceptor = getByKey(interceptorKey);
  if (!interceptor) {
    throw Boom.internal(`Unknown interceptor key ${interceptorKey}`);
  }

  const { type } = interceptor;
  console.log("Matched interceptor", interceptor);

  const handler = InterceptionHandlers.create(type, {
    interceptor,
    payload: request.payload,
  });

  return await handler.handle();

};

module.exports = handlers;
