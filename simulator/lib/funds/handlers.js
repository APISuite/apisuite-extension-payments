const handlers = {};

/**
 * The handler for the following endpoint:
 *
 * POST `/v1/funds/check`
 */
handlers.checkFunds = async (request, h) => {
  const hasFunds = Math.random() > 0.5;
  return h
    .response({
      data: {
        hasFunds
      }
    })
    .code(hasFunds ? 200 : 402);
};

/**
 * The handler for the following endpoint:
 *
 * POST `/v1/funds/consume`
 */
handlers.consumeFunds = async (request, h) => {
  const hasFunds = Math.random() > 0.5;
  return h
    .response({
      data: {
        hasFunds
      }
    })
    .code(hasFunds ? 200 : 402);
};

module.exports = handlers;
