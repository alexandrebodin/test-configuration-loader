const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const util = require('util');

const env = require('./env');

module.exports = dir => {
  const configDir = dir || path.resolve(process.cwd(), 'config');

  const baseConfig = loadFiles(configDir);
  const envConfig = loadFiles(
    path.resolve(configDir, 'env', process.env.NODE_ENV)
  );

  return new Config(_.merge({}, baseConfig, envConfig));
};

class Config {
  constructor(conf) {
    this.conf = conf;
  }

  get(path, defaultValue) {
    return _.get(this.conf, path, defaultValue);
  }

  set(path, val) {
    _.set(this.conf, path, val);
    return this;
  }

  _dump() {
    console.log(util.inspect(this.conf, false, null, true));
  }
}

const loadFiles = dir => {
  if (!fs.existsSync(dir)) return {};

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(file => file.isFile())
    .reduce((acc, file) => {
      const key = path.basename(file.name, path.extname(file.name));

      acc[key] = parseFile(path.resolve(dir, file.name));

      return acc;
    }, {});
};

const parseFile = file => {
  const ext = path.extname(file);

  switch (ext) {
    case '.js': {
      try {
        return parseJS(require(file));
      } catch (error) {
        throw new Error(
          `Imposibble to parse js config file ${file}: ${error.message}`
        );
      }
    }
    case '.json': {
      try {
        return JSON.parse(fs.readFileSync(file));
      } catch (error) {
        throw new Error(
          `Imposibble to parse json config file ${file}: ${error.message}`
        );
      }
    }
    default:
      return {};
  }
};

const parseJS = val => {
  if (typeof val === 'function') return val({ env });
  return val;
};
