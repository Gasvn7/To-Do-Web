import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MiDia from "./components/MiDia";
import Planeado from "./components/Planeado";
import Importante from "./components/Importante";
import Asignado from "./components/Asignado";
import Tareas from "./components/Tareas";
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/miDia" replace />,
    errorElement: <ErrorPage />
  },
  {
  path: '/login',
  element: <Login />,
  errorElement: <ErrorPage />
  },
  {
    path: '/miDia',
    element: <MiDia />,
    errorElement: <ErrorPage />
  },
  {
    path: '/planeado',
    element: <Planeado />,
    errorElement: <ErrorPage />
  }
  ,{
    path: '/importante',
    element: <Importante />,
    errorElement: <ErrorPage />
  }
  ,{
    path: '/asignado',
    element: <Asignado />,
    errorElement: <ErrorPage />
  }
  ,{
    path: '/tareas',
    element: <Tareas />,
    errorElement: <ErrorPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
