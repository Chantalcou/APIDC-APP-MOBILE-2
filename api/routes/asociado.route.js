const express = require('express');
const Asociado = require('../models/Asociado');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const nuevo = await Asociado.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }
    res.status(500).json({ error: 'Error al crear asociado' });
  }
});

module.exports = router;
