const log = require("../helpers/log");

/**
 * A minimal plugin that prints debug information for error responses
 */
exports.plugin = {
  register: async (server, options) => {
    server.ext("onPreResponse", (request, h) => {
      if (request.response instanceof Error) {
        log.debug({ err: request.response }, "Error response");
      }

      return h.continue;
    });
  },
  name: "cloudoki-response-debugger",
  version: require("../../package.json").version
};
