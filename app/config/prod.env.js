module.exports = {
  NODE_ENV: '"production"',
  API_KEY: JSON.stringify(process.env.API_KEY),
  AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
  DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
  PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
  STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
  MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID)
};
