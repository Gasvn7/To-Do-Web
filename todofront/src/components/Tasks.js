import React, { useState } from 'react';
import CreateTaskForm from './CreateTaskForm';

const Tasks = (props) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const tasks = props.tasks

  const handleToggleCreateForm = (event) => {
    event.preventDefault();
    setShowCreateForm(!showCreateForm);
  }

  return (
    <div className='TaskContainer'>
      <div className='TasksTitle'>
        <h1 className='Title'>{props.title}</h1>
        {props.title === 'Mi día' && <span className='TitleFecha'>{props.nombreDia}, {props.numeroDia} de {props.nombreMes}</span>}
      </div>
      <a href='/' className='TasksContainers AddTask' onClick={handleToggleCreateForm}>
        <svg style={{fill: '#E0E1DD'}} width="27" height="27" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"/></svg>
        <p>Nueva tarea</p>
      </a>
      {typeof props.tasks !== 'string' ? (
        Array.isArray(tasks)? (
          tasks.map((task, index) => (
            <div key={index} className='TasksContainers Tasks'>
              <h3 className='InnerTasksChildrens'>{task.titulo}</h3>
              {task.tipo === 'Extenso' ?
                <div className='InnerTasksContainers Column'>
                  <p className='InnerTasksChildrens Fecha'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path d="M14 13h-4v-4h4v4zm6-4h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v13.386c0 2.391-6.648 9.614-9.811 9.614h-14.189v-23h24zm-2 6h-20v15h11.362c4.156 0 2.638-6 2.638-6s6 1.65 6-2.457v-6.543z"/></svg>
                    {task.fecha}
                  </p>
                  <p className='InnerTasksChildrens'>{task.nota}</p>
                </div>
                :
                <div className='InnerTasksContainers'>
                  <p className='InnerTasksChildrens Fecha'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path d="M14 13h-4v-4h4v4zm6-4h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v13.386c0 2.391-6.648 9.614-9.811 9.614h-14.189v-23h24zm-2 6h-20v15h11.362c4.156 0 2.638-6 2.638-6s6 1.65 6-2.457v-6.543z"/></svg>
                    {task.fecha}
                  </p>
                  <p className='InnerTasksChildrens'>{task.nota}</p>
                  
                </div>
              }
            </div>
          ))
        ) : (
          <div className='TasksContainers Tasks'>
              <h3 className='InnerTasksChildrens'>{tasks.titulo}</h3>
              {tasks.tipo === 'Extenso' ?
                <div className='InnerTasksContainers Column'>
                  <p className='InnerTasksChildrens Fecha'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path d="M14 13h-4v-4h4v4zm6-4h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v13.386c0 2.391-6.648 9.614-9.811 9.614h-14.189v-23h24zm-2 6h-20v15h11.362c4.156 0 2.638-6 2.638-6s6 1.65 6-2.457v-6.543z"/></svg>
                    {tasks.fecha}
                  </p>
                  <p className='InnerTasksChildrens'>{tasks.nota}</p>
                </div>
                :
                <div className='InnerTasksContainers'>
                  <p className='InnerTasksChildrens Fecha'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path d="M14 13h-4v-4h4v4zm6-4h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v13.386c0 2.391-6.648 9.614-9.811 9.614h-14.189v-23h24zm-2 6h-20v15h11.362c4.156 0 2.638-6 2.638-6s6 1.65 6-2.457v-6.543z"/></svg>
                    {tasks.fecha}
                  </p>
                  <p className='InnerTasksChildrens'>{tasks.nota}</p>
                </div>
              }
            </div>
        )
      ) : (
        <h1>{tasks}</h1>
      )}
      {showCreateForm && <CreateTaskForm title={props.title} />}
    </div>
  );
}

export default Tasks;
