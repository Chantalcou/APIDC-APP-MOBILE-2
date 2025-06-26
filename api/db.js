const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: process.env.NODE_ENV === 'production' ? { ssl: { rejectUnauthorized: false } } : {},
});

async function init() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión con PostgreSQL establecida.');
  } catch (err) {
    console.error('❌ Error al conectar a la base:', err);
    process.exit(1);
  }
}

init();

module.exports = sequelize;
