require("dotenv").config();

// Redis setup
const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

module.exports = { redis }