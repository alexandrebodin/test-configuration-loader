/**
 *
 * Wondering if we should dump all the default config or no config at all...
 *
 */

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: env('DATABASE_CLIENT', 'sqlite'),
        database: env('DATABASE_NAME', 'strapi'),
        username: env('DATABASE_USER', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        port: env('DATABASE_PORT', 5432),
        host: env('DATABASE_HOST', 'localhost'),
        debug: true,
      },
      options: {
        pool: {
          min: 1,
          max: 10,
        },
      },
    },
  },
});
