import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import Tasks from './Tasks';
import axios from 'axios';

function Tareas() {
  const userRegistered = JSON.parse(sessionStorage.getItem('user'))
  const [allTasks, setAllTasks] = useState([]);

  const title = 'Tareas'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = userRegistered.id;
        const responseAllTasks = await axios.get(`http://localhost:3050/tareas/${uid}`);

        !responseAllTasks.data.message ? setAllTasks(
          responseAllTasks.data.length !== undefined && responseAllTasks.data.length === 1 ? responseAllTasks.data[0] : 
          responseAllTasks.data.length === undefined ? responseAllTasks.data.tareas : responseAllTasks.data
        ) : setAllTasks(responseAllTasks.data.message);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };
    
    fetchData();
  }, []);


  return (
    <div className='Body'>
      <SideBar/>
      <Tasks title={title} tasks={allTasks}/>
    </div>
  )
}

export default Tareas