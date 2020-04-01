const Hapi = require("@hapi/hapi");
const noir = require("pino-noir");
const fundsRoutesBuilder = require("./funds/routes");
const fundsSchemaBuilder = require("./funds/schema");
const fundsHandlers = require("./funds/handlers");
const log = require("./helpers/log");
const pkg = require("../package.json");

exports.init = async config => {
  const server = Hapi.server({
    port: config.server.port,
    host: config.server.host
  });

  await server.register([
    {
      plugin: require("hapi-pino"),
      options: {
        instance: log,
        serializers: config.redactLogs
          ? {
              // Hide the Auth Bearer token in the logs
              req: noir(["req.headers.authorization", "req.headers.cookie"])
                .req,
              res: noir(["res.headers.set-cookie"]).res
            }
          : null
      }
    },
    { plugin: require("./plugins/response-debugger") },
    {
      plugin: {
        register: async server => {
          const fundsSchema = fundsSchemaBuilder(server);
          const fundsRoutes = fundsRoutesBuilder(
            server,
            config,
            fundsSchema,
            fundsHandlers
          );
          server.route(fundsRoutes);
        },
        name: "cropsar-simulator-endpoints",
        version: require("../package.json").version
      },
      routes: {
        prefix: "/v1"
      }
    }
  ]);

  if (config.documentation && config.documentation.enabled) {
    await server.register([
      { plugin: require("@hapi/inert") },
      { plugin: require("@hapi/vision") },
      {
        plugin: require("hapi-swagger"),
        options: {
          info: {
            title: "APISuite Request Middleware Engine",
            version: pkg.version
          }
        }
      }
    ]);
  }

  return server;
};
