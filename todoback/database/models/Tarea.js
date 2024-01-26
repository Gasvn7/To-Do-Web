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
    },
    tarea_descripcion: {
        type: DataTypes.TEXT,
    },
    completada: {
        type: DataTypes.BOOLEAN
    }
},{
    indexes: [
            {
                unique: false,
                fields: ['id_usuario'],
            }
    ],
    tableName: 'tareas',
    timestamps: false
});

module.exports = Tarea;