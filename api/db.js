const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function init() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);
    console.log("✅ Tabla 'users' verificada o creada.");
  } catch (err) {
    console.error('❌ Error inicializando la base:', err);
    process.exit(1);
  }
}

init();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
