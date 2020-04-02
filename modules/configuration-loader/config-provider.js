'use strict';

const assert = require('assert');
const util = require('util');
const _ = require('lodash');

module.exports = class ConfigProvider {
  #config;

  constructor(initialConfig = {}) {
    assert(
      typeof initialConfig === 'object' && initialConfig !== null,
      'Initial config must be an object'
    );

    this.#config = _.cloneDeep(initialConfig);
  }

  get(path, defaultValue) {
    return _.get(this.#config, path, defaultValue);
  }

  set(path, val) {
    _.set(this.#config, path, val);
    return this;
  }

  merge(...args) {
    _.merge(this.#config, ...args);
    return this;
  }

  _dump() {
    console.log(util.inspect(this.#config, false, null, true));
  }
};
