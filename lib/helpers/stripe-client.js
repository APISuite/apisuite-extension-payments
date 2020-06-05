const Boom = require("@hapi/boom");
const stripeLib = require("stripe");
const config = require("../../config");
const log = require("./log");

module.exports = (secretKey) => {
  const methods = {};

  const stripe = stripeLib(secretKey);

  methods.getPaymentSourceId = async ({ customerId }) => {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      const defaultSource = customer.default_source;

      if (!defaultSource) {
        return null;
      }

      return defaultSource;
    } catch (err) {
      log.error(
        { message: err.message },
        "Couldn't get the stripe customer's default source or it is not a Credit Card"
      );
      throw err;
    }
  };

  methods.createCharge = async ({
    customerId,
    description,
    amount,
    currency = "eur",
  }) => {
    const paymentSourceId = await methods.getPaymentSourceId({ customerId });

    if (!paymentSourceId) {
      throw Boom.forbidden("You have no payment source set up");
    }

    try {
      return await stripe.charges.create({
        customer: customerId,
        amount,
        currency,
        source: paymentSourceId,
        description,
      });
    } catch (err) {
      log.error({ message: err.message }, "Couldn't create a new charge");
      throw err;
    }
  };

  return methods;
};
