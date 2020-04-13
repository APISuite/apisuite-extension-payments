const { getByKey } = require("../helpers/interceptors");
const stripeHelper = require("../helpers/stripe-client");
const { InterceptorTypes } = require("../constants");

const CUSTOMER_ID = "cus_H5akfJLqbzyhWX";

const handlers = {};

/**
 * The handler for the following endpoint:
 *
 * POST `/v1/intercept`
 */
handlers.intercept = async (request, h) => {
  const { interceptorKey } = request.payload;

  const interceptor = getByKey(interceptorKey);
  const { type, customer } = interceptor;
  console.log("Matched interceptor", interceptor);

  const { createCharge } = stripeHelper(customer.stripeSecretKey);

  switch (type) {
    case InterceptorTypes.CALC_REQUEST_PRICE:
      // TODO call a configured calculation endpoint
      return { cost: 50, currency: "€", carged: false };
    case InterceptorTypes.CHARGE_REQUEST_PRICE:
      // TODO call a configured calculation endpoint and then charge that value
      // in Stripe
      const calcResult = { cost: 50, currency: "€" };
      const customerId = CUSTOMER_ID;

      const charge = await createCharge({
        customerId,
        description: "CropSAR access",
        amount: calcResult.cost,
        currency: "eur",
      });

      return {
        ...calcResult,
        charged: true,
      };
  }

  return null;
};

module.exports = handlers;
