const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Asociado = sequelize.define('Asociado', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido: { type: DataTypes.STRING, allowNull: false },
  fechaNacimiento: { type: DataTypes.DATEONLY },
  dni: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  telefono: { type: DataTypes.STRING },
  calle: { type: DataTypes.STRING },
  numero: { type: DataTypes.STRING },
  ciudad: { type: DataTypes.STRING },
  codigoPostal: { type: DataTypes.STRING },
  provincia: { type: DataTypes.STRING },
  observaciones: { type: DataTypes.TEXT },
  reprocan: { type: DataTypes.BOOLEAN, defaultValue: false },
  numeroReprocan: { type: DataTypes.STRING },
  vencimiento: { type: DataTypes.DATE },
  fotoReprocan: { type: DataTypes.STRING },
  numeroGestor: { type: DataTypes.STRING },
}, {
  tableName: 'asociados',
});

module.exports = Asociado;
