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

env.float = function envFloat(...args) {
  const value = env(...args);
  return parseFloat(value);
};

env.json = function envJSON(key, val) {
  const value = env(key, val);
  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error(
      `Imposibble to parse json environment variable ${key}: ${error.message}`
    );
  }
};

env.array = function envFloat(...args) {
  let value = env(...args);

  if (value.startsWith('[') && value.endsWith(']')) {
    value = value.substring(1, value.length - 1);
  }

  return value.split(',').map(v => {
    return _.trim(v, '" ');
  });
};

// TODO: add more type casting (dates, json => js object, float, array)

module.exports = env;
