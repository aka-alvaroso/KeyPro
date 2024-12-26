
import axios from '../../axiosConfig';

import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();


  return (

    <form className="space-y-4" onSubmit={async (e) => {
      e.preventDefault();
      const username = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;

      try {
        const response = await axios.post('http://localhost:3000/user/register', {
          username: username,
          email: email,
          password: password
        });

        if (response.data) {
          sessionStorage.setItem('loggedIn', true);
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('userData', JSON.stringify(response.data.user));

          navigate('/');

        }
      } catch (error) {
        console.error(error);
      }
    }}>
      <div className="space-y-2">
        {/* <label htmlFor="name" className={`block text-sm font-medium text-${theme}-text`}>Nombre</label> */}
        <input type="text" name="name" id="register-name" className={`mt-4 bg-transparent text-${theme}-secondary border-b-2 border-${theme}-primary w-full focus:outline-none transition`} placeholder="Nombre" />
      </div>
      <div className="space-y-2">
        {/* <label htmlFor="email" className={`block text-sm font-medium text-${theme}-text`}>Correo electrónico</label> */}
        <input type="email" name="email" id="register-email" className={`mt-4 bg-transparent text-${theme}-secondary border-b-2 border-${theme}-primary w-full focus:outline-none transition`} placeholder="Correo electrónico" />
      </div>
      <div className="space-y-2">
        {/* <label htmlFor="password" className={`block text-sm font-medium text-${theme}-text`}>Contraseña</label> */}
        <input type="password" name="password" id="register-password" className={`mt-4 bg-transparent text-${theme}-secondary border-b-2 border-${theme}-primary w-full focus:outline-none transition`} placeholder="Contraseña" />
      </div>

      <button className={`w-full h-12 bg-transparent border-2 border-${theme}-primary rounded-lg text-${theme}-primary font-bold text-lg mt-4 transition hover:bg-${theme}-primary hover:text-${theme}-background`}>
        Registrarme
      </button>
    </form>
  )
}

export default RegisterForm;