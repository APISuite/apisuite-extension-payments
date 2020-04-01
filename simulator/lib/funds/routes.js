module.exports = (server, options, schema, handlers) => {
  const routes = [];

  routes.push({
    method: "POST",
    path: "/funds/check",
    options: {
      description:
        "Checks if the user has enough funds to perform a certain request",
      tags: ["api", "Funds"],
      validate: {
        payload: schema.interceptRequest
      },
      handler: handlers.checkFunds,
      response: {
        schema: schema.consumeFundsResponse
      }
    }
  });

  routes.push({
    method: "POST",
    path: "/funds/consume",
    options: {
      description:
        "Consumes the funds corresponding to a request that the user is performing if the user has enough funds",
      tags: ["api", "Funds"],
      validate: {
        payload: schema.interceptRequest
      },
      handler: handlers.consumeFunds,
      response: {
        schema: schema.consumeFundsResponse
      }
    }
  });

  return routes;
};
