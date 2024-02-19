import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function SideBar() {
  const [showMenu, setShowMenu] = useState(false);
  /* Llamando a las APIs para recopilar los datos de las tareas (La cantidad de tareas) */
  const [allTasks, setAllTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [plannedTasks, setPlannedTasks] = useState([]);
  const [importantTasks, setImportantTasks] = useState([]);
  const [asignedTasks, setAsignedTasks] = useState([]); 

  
  const userRegistered = JSON.parse(sessionStorage.getItem('user'))
  useEffect(()=>{
   const fetchData = async () => {
    try {
      const uid = userRegistered.id
      const responseAllTasks = await axios.get(`http://localhost:3050/tareas/${uid}`);
      const responseTodayTasks = await axios.get(`http://localhost:3050/tareasMiDia/${uid}`);
      const responsePlannedTasks = await axios.get(`http://localhost:3050/tareasPlaneadas/${uid}`)
      const responseImportantTasks = await axios.get(`http://localhost:3050/tareasDestacadas/${uid}`);
      const responseAsignedTasks = await axios.get(`http://localhost:3050/tareasAsignadas/${uid}`);

      !responseAllTasks.data.message ? setAllTasks(responseTodayTasks.data.length || responseTodayTasks.data.tareas.length) : setAllTasks(0)
      !responseTodayTasks.data.message ? setTodayTasks(responseTodayTasks.data.length || responseTodayTasks.data.tareas.length) : setTodayTasks(0)
      !responseImportantTasks.data.message ? setImportantTasks(responseTodayTasks.data.length || responseTodayTasks.data.tareas.length) : setImportantTasks(0)
      !responsePlannedTasks.data.message ? setPlannedTasks(responseTodayTasks.data.length || responseTodayTasks.data.tareas.length) : setPlannedTasks(0)
      !responseAsignedTasks.data.message ? setAsignedTasks(responseTodayTasks.data.length || responseTodayTasks.data.tareas.length) : setAsignedTasks(0)


    } catch (error) {
      console.error('Error al obtener las tareas:', error); 
    }
   }  

   fetchData()

  },[userRegistered])

  const LogOut = () => {
    sessionStorage.removeItem('user');
    setShowMenu(false)
  }
  
  if(!sessionStorage.getItem('user')){
    return <Navigate to="/login"/>;
  }
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const renderMenu = () => {
    if (userRegistered) {
      return (
        <div className='DropdownMenu'>
          <button className='DropdownMenuButtons' onClick={()=>setShowMenu(false)}>Cerrar ventana</button>
          <button className='DropdownMenuButtons' onClick={LogOut}>Cerrar sesión</button>
        </div>
      );
    }
    return null;
  }

  return (
    <div className='SideBar'>
      <div className='ContainerSideBar Gmail' onClick={toggleMenu}>
        <img src={userRegistered.imagen} alt={userRegistered.imagen} />
        <div className='ContainerGmail'>
          <p>{userRegistered.nombre} {userRegistered.apellido}</p>
          <p>{userRegistered.correo}</p>
        </div>
      </div>
      {showMenu && renderMenu()}
      <a href='/miDia'>
        <div className='ContainerSideBar'>
            <div className='InnerContainer'>
              <svg style={{fill: '#6d737f'}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                <path d="M12 9c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 
                0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5zm-4.184-.599l-3.593-3.594-1.415 1.414 
                3.595 3.595c.401-.537.876-1.013 1.413-1.415zm4.184-1.401c.34 0 .672.033 1 .08v-5.08h-2v5.08c.328-.047.66-.08 
                1-.08zm5.598 2.815l3.595-3.595-1.414-1.414-3.595 3.595c.537.402 1.012.878 1.414 1.414zm-12.598 
                4.185c0-.34.033-.672.08-1h-5.08v2h5.08c-.047-.328-.08-.66-.08-1zm11.185 5.598l3.594 3.593 
                1.415-1.414-3.594-3.593c-.403.536-.879 1.012-1.415 1.414zm-9.784-1.414l-3.593 3.593 1.414 1.414 
                3.593-3.593c-.536-.402-1.011-.877-1.414-1.414zm12.519-5.184c.047.328.08.66.08 1s-.033.672-.08 1h5.08v-2h-5.08zm-6.92 
                8c-.34 0-.672-.033-1-.08v5.08h2v-5.08c-.328.047-.66.08-1 .08z"/></svg>
              <p>Mi día</p>
            </div>
          {/* Número X de tareas */}
          {todayTasks > 0 ? <p>{todayTasks}</p> : <></>}
        </div>
      </a>
      <a href='/importante'>
        <div className='ContainerSideBar'>
          <div className='InnerContainer'>
            <svg style={{fill: '#f1bfcb'}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
              <path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 
              2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 
              5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>
            <p>Importante</p>
          </div>
          {/* Número X de tareas */}
          {importantTasks > 0 ? <p>{importantTasks}</p> : <></>}
        </div>
      </a>
      <a href='/planeado'>
        <div className='ContainerSideBar'>
          <div className='InnerContainer'>
            <svg style={{fill: '#8dcfc5'}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
              <path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 
              0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 
              1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 
            1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z"/></svg>
            <p>Planeado</p>
          </div>
          {/* Número X de tareas */}
          {plannedTasks > 0 ? <p>{plannedTasks}</p> : <></>}
        </div>
      </a>
      <a href='/asignado'>
        <div className='ContainerSideBar'>
          <div className='InnerContainer'>
            <svg style={{fill: '#b0dfcb'}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
              <path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 
              5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 
              13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 
            4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"/></svg>
            <p>Asignado a mí</p>
          </div>
          {/* Número X de tareas */}
          {asignedTasks > 0 ? <p>{asignedTasks}</p> : <></>}
        </div>
      </a>
      <a href='/tareas'>
        <div className='ContainerSideBar'>
          <div className='InnerContainer'>
          <svg style={{fill: '#7983ca'}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
            <path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24zm-4 7h-8v1h8v-1zm0 
            5h-8v1h8v-1zm0 5h-8v1h8v-1zm-10.516-11.304l-.71-.696-2.553 2.607-1.539-1.452-.698.71 2.25 
            2.135 3.25-3.304zm0 5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304zm0 
            5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304z"/></svg>
            <p>Tareas</p>
          </div>
          {/* Número X de tareas */}
          {allTasks > 0 ? <p>{allTasks}</p> : <></>}
        </div>
      </a>
    </div>
  )
}

export default SideBar