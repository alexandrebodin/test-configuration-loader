module.exports = ({ env }) => ({
  connections: {
    default: {
      settings: {
        database: env('DATABASE_NAME', 'strapi_dev'), // or just strapi_dev if you don't care about env vars
        port: env.int('DATABASE_PORT', 54321),
      },
    },
  },
});
