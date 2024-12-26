
import axios from '../../axiosConfig';

import { useState } from 'react';
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [error, setError] = useState(false);

  return (

    <form className="space-y-4" onSubmit={async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      try {
        const response = await axios.post('http://localhost:3000/user/login', {
          email,
          password,
        });

        if (response.data) {
          sessionStorage.setItem('loggedIn', true);
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('userData', JSON.stringify(response.data.user));

          navigate('/');
        }
      } catch (error) {
        if (error.status === 401 || error.status === 404) {
          console.error('Invalid credentials');
          setError('Credenciales inválidas');
        }
      }
    }}>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
        <input type="email" name="email" id="login-email" className={`mt-4 bg-transparent text-${theme}-secondary border-b-2 border-${theme}-primary w-full focus:outline-none transition`} placeholder="Email" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" name="password" id="login-password" className={`mt-4 bg-transparent text-${theme}-secondary border-b-2 border-${theme}-primary w-full focus:outline-none transition`} placeholder="Password" />
      </div>

      <button className={`w-full h-12 bg-transparent border-2 border-${theme}-primary rounded-lg text-${theme}-primary font-bold text-lg mt-4 transition hover:bg-${theme}-primary hover:text-${theme}-background`}>
        Iniciar sesión
      </button>
      {error ? <p className="text-red-600">{error}</p> : ''}
    </form>

  )
}

export default LoginForm;