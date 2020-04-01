const server = require("./lib/server");
const rmeRegistry = require("./lib/request-middleware-engine-registry");
const log = require("./lib/helpers/log");
const config = require("./config");

log.fatal("##### APISuite CropSAR Extension Started #####");

(async () => {
  try {
    rmeRegistry.register();

    const serverInstance = await server.init(config);
    await serverInstance.start();
  } catch (err) {
    log.fatal(err, "Could not start APISuite CropSAR Extension. Exiting.");
    process.exit(1);
  }
})();
