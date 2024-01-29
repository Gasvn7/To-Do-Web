import React from 'react';

function Tasks() {
  const tasks = [
    { Tarea: 'Darle de comer a las gatas', Fecha: 18, Nota: 'Nota extensa para testear el largo del texto.' },
    { Tarea: 'Cambiarle el agua a las gatas', Fecha: 25, Nota: 'Nota extensa para testear el largo del texto.' },
    { Tarea: 'Limpiar las piedritas a las gatas', Fecha: 30, Nota: 'Nota extensa para testear el largo del texto.' },

  ];

  for (let index = 0; index < tasks.length; index++) {
    console.log(tasks[index].Tarea);
  }

  return (
    <div className='TaskContainer '>
      <div className='TasksContainers AddTask'>
        <svg style={{fill: '#E0E1DD'}} width="27" height="27" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg>
        <p>Add New Task</p>
      </div>
      {tasks.map((task, index) => (
        <div key={index} className='TasksContainers Tasks'>
          <p>{task.Tarea}</p>
          <div className='InnerTasksContainers'>
            <p><svg style={{fill: '#E0E1DD'}} xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path d="M14 13h-4v-4h4v4zm6-4h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v13.386c0 2.391-6.648 9.614-9.811 9.614h-14.189v-23h24zm-2 6h-20v15h11.362c4.156 0 2.638-6 2.638-6s6 1.65 6-2.457v-6.543z"/></svg>
              {task.Fecha}
            </p>
            <p>{task.Nota}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
