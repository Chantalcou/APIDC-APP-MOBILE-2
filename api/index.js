const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');
const asociadoRoutes = require('./routes/asociado.route');

dotenv.config();
const app = express();

/* ─── C O R S  ─────────────────────────────────────────────── */
app.use(cors({ origin: '*' }));      // headers en todas las respuestas
app.options('*', cors({ origin: '*' })); // ← responde toda OPTIONS 204 OK
/* ──────────────────────────────────────────────────────────── */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/asociado', asociadoRoutes);

app.get('/', (_, res) => res.send('API funcionando 👌'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`));
