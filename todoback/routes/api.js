const express = require('express');
const router = express.Router();

const usuarios = require('../controllers/usuarios.controller');
const tareas = require('../controllers/todo.controller');

router.get('/tareas', tareas.tareas);
router.get('/tareas/:id', tareas.tarea);
router.post('/tareas', tareas.crear);
router.put('/tareas/actualizar/:id', tareas.actualizar);
router.delete('/tareas/destruir/:id', tareas.eliminar);

router.get('/usuarios', usuarios.lista);
router.get('/usuarios/:id', usuarios.usuario);
router.post('/usuarios', usuarios.crear)

module.exports = router;