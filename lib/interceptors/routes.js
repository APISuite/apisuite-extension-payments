module.exports = (server, options, handlers) => {
  const routes = [];

  routes.push({
    method: "POST",
    path: "/intercept",
    options: {
      description:
        "Intercepts a request. Called from the request-middleware-engine.",
      tags: ["api", "Interceptors"],
      handler: handlers.intercept
    }
  });

  return routes;
};
