const configurationLoader = require('../modules/configuration-loader');

const config = configurationLoader();

config._dump();

// TODO: once the config is laoded => pass it into the validator
// load plugin  / middlewares / hooks config validators ??
