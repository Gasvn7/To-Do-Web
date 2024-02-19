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
          <button className='github-login-button'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 
            11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 
            1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 
            0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 
            3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 
            1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 
            4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Iniciar sesión con Github
          </button>
          {redirectGoogle && <Navigate to="/miDia" />}
        </div>
      </div>
      
    </div>
  )
}

export default Login;
