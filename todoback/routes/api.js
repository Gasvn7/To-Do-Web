const express = require('express');
const router = express.Router();

const usuarios = require('../controllers/usuarios.controller');
const tareas = require('../controllers/todo.controller');

router.get('/tareas/:id', tareas.getAllToDo);
router.get('/tareasMiDia/:id', tareas.getToday);
router.get('/tareasPlaneadas/:id', tareas.getPlanned);
router.get('/tareasDestacadas/:id', tareas.getImportant);
router.get('/tareasAsignadas/:id', tareas.getAsigned);

router.post('/tareas', tareas.create);
router.put('/tareas/actualizar/:id', tareas.update);
router.delete('/tareas/destruir/:id', tareas.delete);

router.get('/usuarios', usuarios.lista);
router.get('/usuarios/email/:email/registro/:registro', usuarios.usuario);
router.post('/usuarios', usuarios.crear)

module.exports = router;