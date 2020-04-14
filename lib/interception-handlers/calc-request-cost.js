const Base = require("./base");
const fetch = require("node-fetch");

class CalcRequestCost extends Base {
  constructor(...args) {
    super(...args);
  }

  async handle() {
    const response = await fetch(this.interceptor.costCalculatorUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body:
      //   method
      //   host
      //   uri
      //   headers
      //   body
      //   uriParams
      body: JSON.stringify(this.payload.request),
    });

    const responseBody = await response.json();
    const costInfo = responseBody.data;
    return costInfo;
  }
}

module.exports = CalcRequestCost;
