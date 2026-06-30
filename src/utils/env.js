require("dotenv").config();

module.exports = {
  APP_NAME: process.env.APP_NAME,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  API_URL: process.env.API_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  DB_HOST: process.env.PGHOST,
  DB_USER: process.env.PGUSER,
  DB_PASSWORD: process.env.PGPASSWORD,
  DB_NAME: process.env.PGDATABASE,
  DB_PORT: process.env.PGPORT,
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL_FROM: process.env.EMAIL_FROM,
  MAILTRAP_TOKEN: process.env.MAILTRAP_TOKEN,
  RUSTFS_ENDPOINT: process.env.RUSTFS_ENDPOINT,
  RUSTFS_ACCESS_KEY: process.env.RUSTFS_ACCESS_KEY,
  RUSTFS_SECRET_KEY: process.env.RUSTFS_SECRET_KEY,
};
