const Boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const { getByKey } = require("../helpers/interceptors");
const InterceptionHandlers = require("../interception-handlers");

const handlers = {};

/**
 * The handler for the following endpoint:
 *
 * POST `/v1/intercept`
 */
handlers.intercept = async (request, h) => {
  const { interceptorKey, request: originalRequest } = request.payload;

  const interceptor = getByKey(interceptorKey);
  if (!interceptor) {
    throw Boom.internal(`Unknown interceptor key ${interceptorKey}`);
  }

  const { type, auth, customer } = interceptor;
  let userEmail;

  if (auth) {
    // This request needs to be authenticated
    const { authorization } = originalRequest.headers;
    if (!authorization) {
      throw Boom.unauthorized(
        "Authentication required but no Authorization header provided"
      );
    }

    const bearerToken = authorization.replace("Bearer ", "");
    const x5cKey = customer.jwtX5cKey;
    const publicKey = `-----BEGIN CERTIFICATE-----\n${x5cKey}\n-----END CERTIFICATE-----`;
    try {
      const decodedToken = jwt.verify(bearerToken, publicKey);
      userEmail = decodedToken.email;
    } catch (err) {
      throw Boom.unauthorized(err.message);
    }
  }

  const handler = InterceptionHandlers.create(type, {
    interceptor,
    payload: request.payload,
    userEmail,
  });

  const result = await handler.handle();
  return h.response(result.body).code(result.status);
};

module.exports = handlers;
