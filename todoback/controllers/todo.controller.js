const db = require('../database/models/Tarea');

const tareas = {
  tareas: async (req, res) => {
    try {
      const tareas = await db.findAll();
      res.json({ tareas });
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  tarea: async (req,res)=>{
    try {
      const tareaId = req.params.id;
      const tarea = await db.findByPk(tareaId);
      
      res.json({ tarea });
    } catch (error) {

      console.error('Error al obtener la tarea:', error);
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  },
  crear: async (req,res)=>{
    try {
      const {tarea_descripcion, id_usuario} = req.body;

      const completada = false;

      const nuevaTarea = await db.create({
        tarea_descripcion,
        id_usuario,
        completada,
        /* Cosas necesarias:
          Titulo:
          Fecha:
          Nota:
          Tipo: Nota (Texto no tan extenso)/Items (Texto extenso que requiere más espacio)
          Id_Usuario:
          Completada:
          Clase_especial: Importante/Asignado_a_mi

          Solo 2 Clase especiales ya que;
          En Planeado se mostrarán todas las tareas;
          En Mi día se mostraran todas las tareas del día;
          En Tareas se mostrarán Todas las tareas y también las completadas;
          
          En Importante se mostrarán las tareas destacadas;
          En Asignado a mí se mostrarán las tareas asignadas al usuario;

        */
      })
      
      res.json({ nuevaTarea })
    } catch (error) {
      console.log('Error al crear una tarea: ', error);
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  },
  actualizar: async (req,res)=>{
    try {
      const tareaId = req.params.id;
      const tarea = await db.findByPk(tareaId);

      db.tarea.update({
        tarea_descripcion: req.body.descripcion,
        completada: req.body.completada
      },{
        where: { id_tarea: tareaId }
      })

      res.sendStatus(204)
    } catch (error) {
      
      console.error('Error al actualizar la tarea:', error);
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  },
  eliminar: async (req,res) =>{
    try {
      const tareaId = req.params.id;
      await db.destroy({ where: {id: tareaId }, force: true })

      return res.status(204).json({ message: `Se eliminó la tarea ${tareaId} con éxito`})
    } catch (error) {

      console.error('Error al eliminar la tarea:', error);
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
};

module.exports = tareas;