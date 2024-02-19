const db = require('../database/models')
const Tarea = db.Tarea;
const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const moment = require('moment-timezone');


const tareas = {
  getAllToDo: async (req, res) => {
    try {
      const uid = req.params.id;
      const tareas = await Tarea.findAll({
        where: {
          id_usuario: uid
        }
      });
      
      res.json({ tareas });
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  getToDo: async (req,res)=>{
    try {
      const tareaId = req.params.id;
      const tarea = await Tarea.findByPk(tareaId);
      
      res.json({ tarea });
    } catch (error) {

      console.error('Error al obtener la tarea:', error);
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  },
  getToday: async (req, res) => {
    try {
      const uid = req.params.id;
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
  
      const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  
      const plannedTasksToday = await Tarea.sequelize.query(
        `SELECT * FROM tareas WHERE fecha = :today AND id_usuario = :uid`,
        {
          replacements: {
            today: formattedDate,
            uid: uid
          },
          type: Tarea.sequelize.QueryTypes.SELECT
        }
      );
  
      if (plannedTasksToday.length !== 0) {
        res.json(plannedTasksToday);
      } else {
        res.json({ message: 'No hay tareas planeadas para hoy.' });
      }
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  getPlanned: async (req, res) => {
    try {
      const uid = req.params.id;
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
  
      const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  
      const plannedTasks = await Tarea.sequelize.query(`
      SELECT * FROM tareas WHERE fecha >= :today AND id_usuario = :uid`,
       {
        replacements: {
          today: formattedDate,
          uid: uid
        },
        type: Tarea.sequelize.QueryTypes.SELECT
      });
  
      if (plannedTasks.length !== 0) {
        res.json(plannedTasks);
      } else {
        res.json({ message: 'No hay tareas planeadas a futuro.' });
      }
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  getImportant: async (req,res) => {
    try {
      const uid = req.params.id;
      const clase_especial = 'Importante'
      const importantTasks = await Tarea.findAll({
        where: {
          clase_especial: clase_especial,
          id_usuario: uid
        }
      })

      if (importantTasks.length != 0) {
        res.json(importantTasks)
      } else {
        res.json({ message: 'No destacaste ninguna tarea sobre las demás.'});
      }
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }

  },
  getAsigned: async (req,res) => {
    try {
      const uid = req.params.id;
      const clase_especial = 'Asignado'
      const asignedTasks = await Tarea.findAll({
        where: {
          clase_especial: clase_especial,
          id_usuario: uid
        }
      })
      
      if (asignedTasks != 0) {
        res.json(asignedTasks)
      } else {
        res.json({ message: 'No tienes ninguna tarea asignada.'})
      }
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  
  create: async (req,res)=>{
    try {
      const {titulo, nota, fecha, tipo, clase_especial, id_usuario, estado} = req.body;

      const formattedDate = moment(fecha, 'DD/MM/YYYY').format('YYYY-MM-DD');

      const nuevaTarea = await Tarea.create({
        id_usuario,
        titulo,
        nota,
        fecha: formattedDate,
        tipo,
        clase_especial,
        estado,
        /* id_tarea|id_usuario|titulo|nota|fecha|estado|tipo|clase_especial */
      })
      
      res.json({ nuevaTarea })
    } catch (error) {
      console.log('Error al crear una tarea: ', error);
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  },
  update: async (req,res)=>{
    try {
      const tareaId = req.params.id;
      const tarea = await Tarea.findByPk(tareaId);

      Tarea.tarea.update({
        titulo: req.body.titulo,
        nota: req.body.nota,
        fecha: req.body.fecha,
        tipo: req.body.tipo,
        clase_especial: req.body.clase_especial,
        estado: req.body.estado
      },{
        where: { id_tarea: tareaId }
      })

      res.sendStatus(204)
    } catch (error) {
      
      console.error('Error al actualizar la tarea:', error);
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  },
  delete: async (req,res) =>{
    try {
      const tareaId = req.params.id;
      await Tarea.destroy({ where: {id: tareaId }, force: true })

      return res.status(204).json({ message: `Se eliminó la tarea ${tareaId} con éxito`})
    } catch (error) {

      console.error('Error al eliminar la tarea:', error);
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
};

module.exports = tareas;