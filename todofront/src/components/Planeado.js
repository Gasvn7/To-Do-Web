import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import Tasks from './Tasks';
import axios from 'axios';

function MiDia() {
  const userRegistered = JSON.parse(sessionStorage.getItem('user'))
  const [plannedTasks, setplannedTasks] = useState([]);

  const title = 'Planeado'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = userRegistered.id;
        const responsePlannedTasks = await axios.get(`http://localhost:3050/tareasPlaneadas/${uid}`);

        !responsePlannedTasks.data.message ? setplannedTasks(
          responsePlannedTasks.data.length !== undefined && responsePlannedTasks.data.length === 1 ? responsePlannedTasks.data[0] : responsePlannedTasks.data
        ) : setplannedTasks(responsePlannedTasks.data);
        
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className='Body'>
      <SideBar/>
      <Tasks title={title} tasks={plannedTasks}/>
    </div>
  )
}

export default MiDia