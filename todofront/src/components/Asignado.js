import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import Tasks from './Tasks';
import axios from 'axios';

function Asignado() {
  const userRegistered = JSON.parse(sessionStorage.getItem('user'))
  const [asignedTasks, setAsignedTasks] = useState([]);

  const title = 'Asignado a Mí'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = userRegistered.id;
        const responseAsignedTasks = await axios.get(`http://localhost:3050/tareasAsignadas/${uid}`);

        !responseAsignedTasks.data.message ? setAsignedTasks(
          responseAsignedTasks.data.length !== undefined && responseAsignedTasks.data.length === 1 ? responseAsignedTasks.data[0] : responseAsignedTasks.data
        ) : setAsignedTasks(responseAsignedTasks.data.message);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className='Body'>
      <SideBar/>
      <Tasks title={title} tasks={asignedTasks}/>
    </div>
  )
}

export default Asignado