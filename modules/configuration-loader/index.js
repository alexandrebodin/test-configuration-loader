'use strict';

const dotenv = require('dotenv');

dotenv.config({ path: process.env.ENV_PATH });
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const _ = require('lodash');
const path = require('path');

const ConfigProvider = require('./config-provider');
const loadConfigDir = require('./config-loader');

module.exports = dir => {
  const configDir = dir || path.resolve(process.cwd(), 'config');
  const baseConfig = loadConfigDir(configDir);

  const envDir = path.resolve(configDir, 'env', process.env.NODE_ENV);
  const envConfig = loadConfigDir(envDir);

  return new ConfigProvider(_.merge(baseConfig, envConfig));
};
