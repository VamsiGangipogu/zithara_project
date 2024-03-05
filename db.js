const { Pool } = require('pg');

const pool = new Pool({
  user: 'vamsi_g',
  password: 'Vamsi@4777',
  host: 'localhost',
  port: 5432,
  database: 'my_data'
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};