import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import Tasks from './Tasks';
import axios from 'axios';

function MiDia() {
  const userRegistered = JSON.parse(sessionStorage.getItem('user'))
  const [todayTasks, setTodayTasks] = useState([]);

  const title = 'Mi día'
  const fecha = new Date();
  const numeroDia = fecha.getDate()
  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const nombreMes = nombresMeses[fecha.getMonth()]
  const nombreDia = fecha.toLocaleDateString('es-ES', {weekday:'long'})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = userRegistered.id;
        const responseTodayTasks = await axios.get(`http://localhost:3050/tareasMiDia/${uid}`);

        !responseTodayTasks.data.message ? setTodayTasks(
          responseTodayTasks.data.length !== undefined && responseTodayTasks.data.length === 1 ? responseTodayTasks.data[0] : responseTodayTasks.data.tareas
        ) : setTodayTasks(responseTodayTasks.data);

      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className='Body'>
      <SideBar/>
      <Tasks title={title} nombreDia={nombreDia} numeroDia={numeroDia} nombreMes={nombreMes} tasks={todayTasks}/>
    </div>
  )
}

export default MiDia