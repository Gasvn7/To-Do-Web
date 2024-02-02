const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(require('../config/config').development);

const Tarea = sequelize.define('Tarea', {
    id_tarea: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nota: {
        type: DataTypes.TEXT,
    },
    fecha: {
        type: DataTypes.DATE,
    },
    tipo: {
        type: DataTypes.STRING,
    },
    clase_especial: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'tareas',
    timestamps: false
});

module.exports = Tarea;
