const db = require('../database/models/Usuario');

const usuarios = {
  lista: async (req, res) => {
    try {
      const usuarios = await db.findAll();
      res.json({ usuarios });
    } catch (error) {
      console.error('Error al obtener las usuarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  usuario: async(req,res)=>{
    try {
      const { email, registro } = req.params;

      const usuario = await db.findOne({
        where: {
          correo: email,
          registro: registro
        }
      })

      if(!usuario){
        return res.status(404).json({mensaje: 'Usuario no encontrado'})
      }
      res.json({ usuario })
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  crear: async(req,res)=>{
    try {
      const { nombre, apellido, imagen, correo, registro } = req.body;

      const nuevoUsuario = await db.create({
        nombre,
        apellido,
        imagen,
        correo,
        registro
      })

      res.json({ nuevoUsuario })
    } catch (error) {
      console.log('Error al crear el usuario: ', error);
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
};

module.exports = usuarios;