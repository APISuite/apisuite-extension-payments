const fetch = require("node-fetch");
const config = require("../config");

exports.register = async () => {
  const { url } = config.requestMiddlewareEngine;
  const registryUrl = `${url}/v1/interceptors`;

  const { publicUrl } = config.server;
  const callbackUrl = `${publicUrl}/v1/funds/check`;

  return fetch(registryUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      service: "cropsar",
      route: "/maps/thing",
      lifecycle: "pre",
      url: callbackUrl,
      consumerGroup: "extensions-cropsar-funds"
    })
  });
};
