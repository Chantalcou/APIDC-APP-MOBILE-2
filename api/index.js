require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const Asociado = require('./models/Asociado');

const app = express();
app.use(express.json());

// Sincronizar modelos con la base al iniciar
sequelize.sync();

app.post('/api/asociado', async (req, res) => {
  const {
    nombre,
    apellido,
    fechaNacimiento,
    dni,
    email,
    telefono,
    calle,
    numero,
    ciudad,
    codigoPostal,
    provincia,
    observaciones,
    reprocan,
    numeroReprocan,
    vencimiento,
    fotoReprocan,
    numeroGestor,
  } = req.body;

  if (!nombre || !apellido || !email) {
    return res.status(400).json({ error: 'nombre, apellido y email son obligatorios' });
  }

  try {
    const nuevo = await Asociado.create({
      nombre,
      apellido,
      fechaNacimiento,
      dni,
      email,
      telefono,
      calle,
      numero,
      ciudad,
      codigoPostal,
      provincia,
      observaciones,
      reprocan,
      numeroReprocan,
      vencimiento,
      fotoReprocan,
      numeroGestor,
    });
    res.status(201).json(nuevo);
  } catch (err) {
    console.error('❌ Error al crear asociado:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 API escuchando en el puerto ${PORT}`);
});
