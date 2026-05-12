import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import Footer from '../components/Footer/Footer';
import Button from '../components/ui/Button';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('loggedIn') === 'true') navigate('/');
  }, [navigate]);

  return (
    <div className="bg-kp-bg text-kp-text w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-3">
          <img className="w-12 h-auto" src="/keypro/logo.png" alt="logo" />
          <h1 className="text-3xl font-medium">KeyPro</h1>
        </div>

        <div className="relative overflow-hidden w-80" style={{ height: isLogin ? '220px' : '256px' }}>
          <div className={`transition-transform duration-400 ease-in-out ${isLogin ? 'translate-x-0' : '-translate-x-full'} absolute w-full`}>
            <LoginForm />
          </div>
          <div className={`transition-transform duration-400 ease-in-out ${isLogin ? '-translate-x-full' : 'translate-x-0'} absolute w-full`}>
            <RegisterForm />
          </div>
        </div>

        <div className="flex gap-2 w-80">
          <Button
            variant={isLogin ? 'filled' : 'ghost'}
            className="flex-1 justify-center"
            onClick={() => setIsLogin(true)}
          >
            Iniciar sesión
          </Button>
          <Button
            variant={!isLogin ? 'filled' : 'ghost'}
            className="flex-1 justify-center"
            onClick={() => setIsLogin(false)}
          >
            Registrarme
          </Button>
        </div>

        <Link to="/">
          <button className="text-sm text-kp-muted underline hover:text-kp-accent transition-colors">
            Entrar como invitado
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
