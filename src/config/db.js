const { Pool } = require('pg');
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
} = require('../utils/env');

const config = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
};

const db = new Pool(config);

db.connect((err) => {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
  console.log('Database successfully connected');
});

module.exports = db;
