import React, { useState, useEffect } from 'react';
import axios from "axios";
const CreateTaskForm = (props) => {
  const [titulo, setTitulo] = useState('');
  const [nota, setNota] = useState('');
  const [fecha, setFecha] = useState('');
  const [tipo, setTipo] = useState('Corto');

  useEffect(() => {
    if (props.title === 'Mi día') {
      const fechaActual = new Date();
      const year = fechaActual.getFullYear();
      const month = fechaActual.getMonth() + 1;
      const day = fechaActual.getDate();

      setFecha(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);
    }

    if(nota.length >= 50){
      setTipo('Extenso')
    }
  }, [props.title, nota]);

  const userData = JSON.parse(sessionStorage.getItem('user'))
  const userEmail = userData.correo;
  const userRegistro = userData.registro;

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    try {
      const response = await axios.get(`http://localhost:3050/usuarios/email/${userEmail}/registro/${userRegistro}`);
      const usuario = response.data.usuario

      const formData = {
        id_usuario: usuario.id,
        titulo,
        nota,
        fecha,
        tipo,
        clase_especial: 'Ninguna',
        estado: 'Pendiente'
      };

      await axios.post('http://localhost:3050/tareas', formData);

      window.location.reload();
    } catch (error) {
      console.error('Error al enviar los datos al servidor:', error);
    }
  };

  return (
    <div className="create-task-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} maxLength={30} required/>
        </label>
        <label>
          Nota:
          <textarea value={nota} onChange={(e) => setNota(e.target.value)} required/>
        </label>
        <label>
          Fecha:
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </label>
        <button type="submit">Crear Tarea</button>
      </form>
      
    </div>
  );
};

export default CreateTaskForm;
