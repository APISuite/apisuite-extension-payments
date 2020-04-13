const server = require("./lib/server");
const rmeRegistry = require("./lib/request-middleware-engine-registry");
const log = require("./lib/helpers/log");
const config = require("./config");

log.fatal("##### APISuite Payments Extension Started #####");

(async () => {
  try {
    rmeRegistry.register();

    const serverInstance = await server.init(config);
    await serverInstance.start();
  } catch (err) {
    log.fatal(err, "Could not start APISuite Payments Extension. Exiting.");
    process.exit(1);
  }
})();
