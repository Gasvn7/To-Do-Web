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
    contrasena: {
        type: DataTypes.STRING,
    }
},{
    timestamps: false
});

module.exports = Usuario;