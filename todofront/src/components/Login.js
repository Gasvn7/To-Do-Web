import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
/* import { redirect } from 'react-router-dom'; */
import { clientId_Google, clientId_GitHub } from '../private/ClientID';

function Login() {
  
  function loginWithGithub(){
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + clientId_GitHub)
  }

  return (
    <div className='Body'>
      <GoogleOAuthProvider clientId={clientId_Google}>
        <GoogleLogin
          onSuccess={credentialResponse => {
            const credentialResponseDecoded = jwtDecode(
              credentialResponse.credential
            );

            const usuario = {
              nombre: credentialResponseDecoded.given_name,
              apellido: credentialResponseDecoded.family_name,
              imagen: credentialResponseDecoded.picture,
              correo: credentialResponseDecoded.email,
              credencial: credentialResponseDecoded.sub
            }

            sessionStorage.setItem('user', JSON.stringify(usuario));

            console.log(credentialResponseDecoded)
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
      <button>
        Login with GitHub
      </button>
    </div>
  )
}

export default Login