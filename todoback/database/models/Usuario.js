const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(require('../config/config').development);

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    correo: {
        type: DataTypes.STRING,
    },
    apellido: {
        type: DataTypes.STRING,
    },
    imagen: {
        type: DataTypes.STRING,
    },
    registro: {
        type: DataTypes.STRING,
    },

},{
    timestamps: false
});

module.exports = Usuario;