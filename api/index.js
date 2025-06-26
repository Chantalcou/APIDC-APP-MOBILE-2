require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const Asociado = require('./models/Asociado');

const app = express();
app.use(express.json());

async function startServer() {
  try {
    await sequelize.sync();
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al sincronizar la base de datos:', err);
  }
}

startServer();
