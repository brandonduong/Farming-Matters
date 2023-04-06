/**
 * Initializes the Redis client (basically a key-value store) and exports the client.
 * Used to interact with Redis.
 * See https://github.com/luin/ioredis#readme
 */

require("dotenv").config();

// Redis setup
const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

module.exports = { redis }