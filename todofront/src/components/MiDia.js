import React from 'react'
import SideBar from './SideBar'
import Tasks from './Tasks'

function MiDia() {
  const title = 'Mi día'
  const fecha = new Date();
  const numeroDia = fecha.getDate()
  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const nombreMes = nombresMeses[fecha.getMonth()]
  const nombreDia = fecha.toLocaleDateString('es-ES', {weekday:'long'})


  return (
    <div className='Body'>
      <SideBar/>
      <Tasks title={title} nombreDia={nombreDia} numeroDia={numeroDia} nombreMes={nombreMes}/>
    </div>
  )
}

export default MiDia