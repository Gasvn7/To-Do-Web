import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { clientId_Google,  } from '../private/ClientID';
import axios from "axios";

function Login() {
  const [redirectGoogle, setRedirectGoogle] = useState(false);

  const loginGoogle = async (credentialResponse) => {
    var data = jwtDecode(credentialResponse.credential);
    const usuario = {
      nombre: data.given_name,
      correo: data.email,
      apellido: data.family_name,
      imagen: data.picture,
      registro: 'Google'
    }
    try {
      const response = await axios.get(`http://localhost:3050/usuarios/email/${usuario.correo}/registro/${usuario.registro}`);
      
      if (response.data.usuario === null) {
        // Registrar en la base de datos y en Session al usuario que ingresa por primera vez
        await axios.post('http://localhost:3050/usuarios', 
          JSON.stringify(usuario)
        );
        sessionStorage.setItem('user', JSON.stringify(usuario));
        
        setRedirectGoogle(true);
      }else{
        // Registrar en Session el usuario que viene por la base de datos
        sessionStorage.setItem('user', JSON.stringify(response.data.usuario));
        
        setRedirectGoogle(true);
      }

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='Body Login'>
      <div className='LoginForm Container'>
        <h1>
          Bienvenido
        </h1>
        <h2>
          Ingresa a TO-DO Web!
        </h2>
        <div className='LoginForm Buttons'>
          <GoogleOAuthProvider clientId={clientId_Google}>
            <GoogleLogin
              onSuccess={loginGoogle}
              className="google-login-button"
            />
          </GoogleOAuthProvider>
          
          {redirectGoogle && <Navigate to="/" />}
        </div>
      </div>
      
    </div>
  )
}

export default Login;
