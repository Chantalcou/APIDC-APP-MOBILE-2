require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const Asociado = require('./models/Asociado');

const app = express();
app.use(express.json());

// Ruta para crear un asociado
app.post('/api/asociado', async (req, res) => {
  try {
    const asociado = await Asociado.create(req.body);
    res.json(asociado);
  } catch (err) {
    console.error('Error al crear asociado:', err);
    res.status(500).json({ error: 'Error al crear el asociado' });
  }
});

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
