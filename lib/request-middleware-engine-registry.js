const fetch = require("node-fetch");
const config = require("../config");
const interceptorConfig = require("../interceptor.config.json");

exports.register = async () => {
  const { url } = config.requestMiddlewareEngine;
  const registryUrl = `${url}/v1/interceptors`;

  const { publicUrl } = config.server;
  const callbackUrl = `${publicUrl}/v1/intercept`;

  for (const interceptor of interceptorConfig.interceptors) {
    const {
      interceptorKey,
      targetMethod,
      targetHost,
      targetUri,
      consumerGroup,
    } = interceptor;

    await fetch(registryUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetMethod,
        targetHost,
        targetUri,
        interceptorKey,
        consumerGroup,
        interceptorUrl: callbackUrl,
      }),
    });
  }
};
