const Base = require("./base");
const fetch = require("node-fetch");
const stripeHelper = require("../helpers/stripe-client");

// TODO get the stripe customer id from the CropSAR user session somehow
const CUSTOMER_ID = "cus_H5akfJLqbzyhWX";

class CalcRequestCost extends Base {
  constructor(...args) {
    super(...args);
  }

  async handle() {
    const { costCalculatorUrl, customer } = this.interceptor;

    const response = await fetch(costCalculatorUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.payload.request),
    });

    const responseBody = await response.json();
    console.log({ responseBody });
    const costInfo = responseBody.data;

    const customerId = CUSTOMER_ID;

    const { createCharge } = stripeHelper(customer.stripeSecretKey);

    await createCharge({
      customerId,
      description: "CropSAR access",
      amount: costInfo.value,
      currency: costInfo.currency,
    });

    return {
      ...costInfo,
      charged: true,
    };
  }
}

module.exports = CalcRequestCost;
