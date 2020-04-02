'use strict';

const dotenv = require('dotenv');
const _ = require('lodash');

dotenv.config({ path: process.env.ENV_PATH });
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function env(key, defaultValue) {
  return _.has(process.env, key) ? process.env[key] : defaultValue;
}

env.int = function envInt(...args) {
  const value = env(...args);
  return parseInt(value, 10);
};

env.bool = function envBool(...args) {
  const value = env(...args);
  return value === 'true';
};

module.exports = env;
