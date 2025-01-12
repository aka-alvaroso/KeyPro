
import { useState, useEffect } from 'react'
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import Footer from '../components/Footer/Footer';


const Auth = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('loggedIn') === 'true') {
      navigate('/');
    }
  }, [navigate])

  return (
    <div className={`bg-${theme}-background text-${theme}-text w-screen h-screen flex flex-col items-center justify-center`}>
      <div className={`w-full h-4/5 flex flex-col items-center justify-center`}>
        <div className="flex gap-2 items-center">
          <img className={`w-16 h-auto ${theme === 'lightOrange' || theme === 'lightGreen' || theme === 'lightBlue' ? 'invert' : ''}`} src='/logo.png' alt='logo' />
          <h1 className='text-4xl font-bold'>KeyPro</h1>

        </div>


        <div className={`mt-6 relative overflow-hidden h-56 w-72`}>
          <div className={`transition-transform duration-500 ease-in-out ${isLogin ? 'translate-x-0' : '-translate-x-full'} absolute w-full`}>
            <LoginForm />
          </div>
          <div className={`transition-transform duration-500 ease-in-out ${isLogin ? '-translate-x-full' : 'translate-x-0'} absolute w-full`}>
            <RegisterForm />
          </div>
        </div>

        <div className="mt-6 w-72 flex justify-around">
          <button className={`w-1/2 ${isLogin ? 'bg-' + theme + '-primary text-' + theme + '-background' : 'bg-transparent'} p-2 rounded transition`} onClick={() => setIsLogin(true)}>
            Iniciar sesión
          </button>
          <button className={`w-1/2 ${!isLogin ? 'bg-' + theme + '-primary text-' + theme + '-background' : 'bg-transparent'} p-2 rounded transition`} onClick={() => setIsLogin(false)}>
            Registrarme
          </button>
        </div>

        <Link to='/'>
          <button className={`mt-6 text-${theme}-primary underline`}>
            Entra como invitado
          </button>
        </Link>
        {/* <a href='/' className={`mt-6 text-${theme}-primary underline`}>
        Entrar como invitado
      </a> */}


      </div >
      <Footer />
    </div>
  )
}

export default Auth;