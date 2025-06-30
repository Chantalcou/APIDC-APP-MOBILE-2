// api/models/Asociado.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Asociado = sequelize.define('Asociado', {
  nombre:  { type: DataTypes.STRING, allowNull: false },
  apellido:{ type: DataTypes.STRING, allowNull: false },
  fechaNacimiento: DataTypes.DATEONLY,
  dni:     DataTypes.STRING,
  /* 👇  AÑADE unique: true */
  email:   { type: DataTypes.STRING, allowNull: false, unique: true },
  telefono:       DataTypes.STRING,
  calle:          DataTypes.STRING,
  numero:         DataTypes.STRING,
  ciudad:         DataTypes.STRING,
  codigoPostal:   DataTypes.STRING,
  provincia:      DataTypes.STRING,
  observaciones:  DataTypes.TEXT,
  reprocan:       { type: DataTypes.BOOLEAN, defaultValue: false },
  numeroReprocan: DataTypes.STRING,
  vencimiento:    DataTypes.DATE,
  fotoReprocan:   DataTypes.STRING,
  numeroGestor:   DataTypes.STRING
}, {
  tableName: 'asociados'
});

module.exports = Asociado;
