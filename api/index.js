const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const asociadoRoutes = require('./routes/asociado.route');

dotenv.config();
const app = express();
const corsOptions = {
  origin: 'http://localhost:8081',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


// Middlewares de parseo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/asociado', asociadoRoutes);

// Checkeo base
app.get('/', (_, res) => res.send('API funcionando 👌'));

// Arranca
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
);
