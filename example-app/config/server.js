/**
 *
 * Wondering if we should dump all the default config or no config at all...
 *
 */

module.exports = ({ env }) => ({
  url: env('SERVER_URL'),
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  urls: env.array('URLS'),
  random: env.json('SOME_JSON'),
  date: env.date('DATE'),
});
