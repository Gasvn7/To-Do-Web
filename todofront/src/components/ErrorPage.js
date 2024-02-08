import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div>
      <h1>Error 404 NotFound</h1>
      <Link to='/'>Home</Link>
    </div>
  )
}

export default ErrorPage