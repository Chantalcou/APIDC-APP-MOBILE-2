require('dotenv').config();
const express = require('express');
const cors = require('cors');
const asociadoRoutes = require('./routes/asociado.route');
const sequelize = require('./db');

const app = express();

app.use(cors({ origin: '*' }));
app.options('*', cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API funcionando 👌');
});

app.use('/api/asociado', asociadoRoutes);

async function start() {
  try {
    await sequelize.sync();
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log('Servidor corriendo…');
    });
  } catch (err) {
    console.error('Error al iniciar la aplicación:', err);
  }
}

start();
