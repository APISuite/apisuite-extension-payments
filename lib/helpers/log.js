const config = require("../../config")
const pino = require("pino")

const pinoConfig = config.logger

module.exports = pino(pinoConfig)
