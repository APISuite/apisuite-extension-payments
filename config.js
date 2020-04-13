module.exports = {
  server: {
    host: process.env.APISUITE_EXT_PAYMENTS_HOST || "0.0.0.0",
    port: process.env.APISUITE_EXT_PAYMENTS_PORT || "3003",
    publicUrl:
      process.env.APISUITE_EXT_PAYMENTS_PUBLIC_URL || "http://localhost:3003",
  },
  requestMiddlewareEngine: {
    url: process.env.APISUITE_EXT_PAYMENTS_RME_URL || "http://localhost:3002",
  },
  logger: {
    name: process.env.APISUITE_EXT_PAYMENTS_LOGGER_NAME || "EXT_PAYMENTS",
    level: process.env.APISUITE_EXT_PAYMENTS_LOGGER_LEVEL || "debug",
  },
  redactLogs: process.env.APISUITE_EXT_PAYMENTS_REDACT_LOGS !== "false",
  documentation: {
    enabled: process.env.APISUITE_EXT_PAYMENTS_DOCS_ENABLED === "true",
  },
  stripe: {
    mode: process.env.APISUITE_EXT_PAYMENTS_STRIPE_MODE || "test", // "test" or "live"
    secretKey:
      process.env.APISUITE_EXT_PAYMENTS_STRIPE_SECRET_KEY || "sk_test_123",
  },
};
