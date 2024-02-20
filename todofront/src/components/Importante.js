import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import Tasks from './Tasks';
import axios from 'axios';

function Importante() {
  const userRegistered = JSON.parse(sessionStorage.getItem('user'))
  const [importantTasks, setImportantTasks] = useState([]);

  const title = 'Importante'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = userRegistered.id;
        const responseImportantTasks = await axios.get(`http://localhost:3050/tareasDestacadas/${uid}`);

        !responseImportantTasks.data.message ? setImportantTasks(
          responseImportantTasks.data.length !== undefined && responseImportantTasks.data.length === 1 ? responseImportantTasks.data[0] : responseImportantTasks.data
        ) : setImportantTasks(responseImportantTasks.data.message);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className='Body'>
      <SideBar/>
      <Tasks title={title} tasks={importantTasks}/>
    </div>
  )
}

export default Importante