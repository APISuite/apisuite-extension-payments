module.exports = {
  server: {
    host: process.env.APISUITE_EXT_CROPSAR_HOST || "localhost",
    port: process.env.APISUITE_EXT_CROPSAR_PORT || "3001",
    publicUrl:
      process.env.APISUITE_EXT_CROPSAR_PUBLIC_URL || "http://localhost:3001"
  },
  logger: {
    name: process.env.APISUITE_EXT_CROPSAR_LOGGER_NAME || "EXT_CROPSAR",
    level: process.env.APISUITE_EXT_CROPSAR_LOGGER_LEVEL || "debug"
  },
  documentation: {
    enabled: process.env.APISUITE_EXT_CROPSAR_DOCS_ENABLED === "true"
  },
  requestMiddlewareEngine: {
    url: process.env.APISUITE_EXT_CROPSAR_RME_URL || "http://localhost:3002"
  },
  redactLogs: process.env.APISUITE_EXT_CROPSAR_REDACT_LOGS !== "false"
};
