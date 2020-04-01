const configurationLoader = require('./modules/configuration-loader');

const config = configurationLoader(`${__dirname}/example-app/config`);

config._dump();
