const Base = require("./base");
const fetch = require("node-fetch");
const stripeHelper = require("../helpers/stripe-client");

// For demo purposes, if no client email / stripe customer id match can be
// made, this is an existing customer id (tiagoalves@cloudoki.com) that exists
// in our Stripe demo account in the "test" environment.
const DEMO_UNAUTHORIZED_CUSTOMER_ID = "cus_H5akfJLqbzyhWX";

class CalcRequestCost extends Base {
  constructor(...args) {
    super(...args);
  }

  async handle() {
    const { costCalculatorUrl, customer } = this.interceptor;
    const { userCustomerMap } = customer;

    const response = await fetch(costCalculatorUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.payload.request),
    });

    const responseBody = await response.json();
    const costInfo = responseBody.data;

    const customerId =
      userCustomerMap[this.userEmail] || DEMO_UNAUTHORIZED_CUSTOMER_ID;

    const { createCharge } = stripeHelper(customer.stripeSecretKey);

    await createCharge({
      customerId,
      description: "CropSAR access",
      amount: costInfo.value,
      currency: costInfo.currency,
    });

    return {
      status: 200,
      body: {
        ...costInfo,
        charged: true,
      },
    };
  }
}

module.exports = CalcRequestCost;
