const interceptorConfig = require("../../interceptor.config.json");

const customersById = interceptorConfig.customers.reduce((accum, customer) => {
  return {
    ...accum,
    [customer.id]: customer,
  };
}, {});

const interceptorsByKey = interceptorConfig.interceptors.reduce(
  (accum, interceptor) => {
    return {
      ...accum,
      [interceptor.interceptorKey]: {
        ...interceptor,
        customer: customersById[interceptor.customerId],
      },
    };
  },
  {}
);

exports.getByKey = (key) => {
  return interceptorsByKey[key];
};
