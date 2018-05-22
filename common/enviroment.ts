export const env = {
  server: {
    port: process.env.PORT || 3000
  },
  db: {
    url:
      process.env.DB_URL ||
      'mongodb://admin:admin@ds117590.mlab.com:17590/meat-api'
  }
};
