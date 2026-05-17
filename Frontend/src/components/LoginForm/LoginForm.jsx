import axios from '../../axiosConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, { email, password });
      if (response.data) {
        sessionStorage.setItem('loggedIn', true);
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userData', JSON.stringify({
          username: response.data.user.username,
          email: response.data.user.email,
          stats: response.data.user.stats,
        }));
        navigate('/');
      }
    } catch (err) {
      if (err.status === 401 || err.status === 404) setError('Credenciales inválidas');
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input type="email" id="login-email" placeholder="Email" />
      <Input type="password" id="login-password" placeholder="Contraseña" />
      <Button type="submit" variant="outline" className="w-full justify-center mt-2">
        Iniciar sesión
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default LoginForm;
