const ChargeRequestCost = require("./charge-request-cost");
const CalcRequestCost = require("./calc-request-cost");
const { InterceptorTypes } = require("../constants");

const HandlersByType = {
  [InterceptorTypes.CALC_REQUEST_COST]: CalcRequestCost,
  [InterceptorTypes.CHARGE_REQUEST_COST]: ChargeRequestCost,
};

exports.create = (type, ...args) => {
  const Handler = HandlersByType[type];
  if (!Handler) {
    throw new Error(`Unknown interception handler of type "${type}"`);
  }

  return new Handler(...args);
};
