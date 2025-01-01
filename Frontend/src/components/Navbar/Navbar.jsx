// src/components/Navbar.jsx

import PropTypes from 'prop-types';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faBrush, faChevronDown, faCrown, faUser } from '@fortawesome/free-solid-svg-icons'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { faVolumeXmark } from '@fortawesome/free-solid-svg-icons'


const Navbar = ({ sound, setSound, setThemeModalIsOpen }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [isSubMenuOpened, setIsSubMenuOpened] = useState(false);

  const [userData, setUserData] = useState({
    username: '',
    stats: {
      avgAccuracy: 0,
      avgScore: 0,
      avgSpeed: 0,
      bestScore: 0,
      bestSpeed: 0,
      numCharacters: 0,
      numEasyTests: 0,
      numErrors: 0,
      numHardTests: 0,
      numMediumTests: 0,
      totalTests: 0,
      imageURL: 'https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp'
    }
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (sessionStorage.getItem('loggedIn') === 'true') {

          const response = await axios.get('http://localhost:3000/user/data', {
            headers: {
              username: JSON.parse(sessionStorage.getItem('userData')).username
              // username: sessionStorage.getItem('userData').username
            }
          });

          if (response.status !== 200) {
            console.error('Error al obtener el usuario:', response);
            return
          }

          setUserData(response.data.user);
        }

      } catch (e) {
        console.error('Error al obtener el usuario:', e);
      }
    }
    fetchUser();


  });

  return (
    <nav className="navbar w-4/5 h-1/5 flex items-center p-16">
      <div className='flex items-center justify-center'>
        <Link className='flex items-center justify-center' to='/' >
          <img className={`w-16 h-auto ${theme === 'lightOrange' || theme === 'lightGreen' || theme === 'lightBlue' ? 'invert' : ''}`} src='/logo.png' alt='logo' />
          <h2 className='text-2xl font-bold ml-4'>TypeMaster</h2>
        </Link>

        <button
          className={`ml-4 text-xl text-${theme}-text border-none hover:text-${theme}-primary hover:cursor-pointer transition`}
          onClick={() => setThemeModalIsOpen(true)} >
          <FontAwesomeIcon icon={faBrush} />
        </button>
        <button
          className={`ml-4 text-xl text-${theme}-text border-none hover:text-${theme}-primary hover:cursor-pointer transition`}
          onClick={() => navigate('/rankings')}>
          <FontAwesomeIcon icon={faCrown} />
        </button>
      </div>
      <div className='ml-auto flex'>
        <button onClick={() => setSound(!sound)}
          className={`ml-4 text-xl text-${theme}-text border-none hover:text-${theme}-primary hover:cursor-pointer transition`}>
          {sound ? <FontAwesomeIcon icon={faVolumeHigh} /> : <FontAwesomeIcon icon={faVolumeXmark} />}
        </button>

        {
          sessionStorage.getItem('loggedIn') === 'true' ?

            <button
              onClick={() => setIsSubMenuOpened(!isSubMenuOpened)}
              className={`ml-4 flex items-center bg-${theme}-primary bg-opacity-20 py-2 px-4 rounded-md text-md font-bold text-${theme}-primary hover:bg-opacity-75 hover:text-${theme}-background transition`}>
              <img src={userData.imageURL} className='w-8 h-8 rounded-full object-cover' alt='profile' />
              <span className='ml-2'>
                {JSON.parse(sessionStorage.getItem('userData')).username}
                {isSubMenuOpened
                  ? <FontAwesomeIcon icon={faChevronDown} className='rotate-0 transition ml-2' />
                  : <FontAwesomeIcon icon={faChevronDown} className='-rotate-90 transition ml-2' />
                }
              </span>


              <div className={`${isSubMenuOpened ? 'block' : 'hidden'} absolute top-32 right-64 bg-${theme}-primary bg-opacity-20 text-${theme}-primary text-left rounded-md shadow-md p-4`}>
                <Link to={`/profile/${JSON.parse(sessionStorage.getItem('userData')).username}`} >
                  <p className={`py-1 px-2 rounded hover:bg-${theme}-primary hover:text-${theme}-text transition`}><FontAwesomeIcon icon={faUser} /> Mi perfil</p>
                </Link>
                <p
                  onClick={() => {
                    sessionStorage.setItem('loggedIn', 'false');
                    sessionStorage.removeItem('userData');
                    sessionStorage.removeItem('token');
                    navigate('/');
                  }}
                  className={`py-1 px-2 rounded hover:bg-${theme}-primary hover:text-${theme}-text transition`}><FontAwesomeIcon icon={faArrowRightToBracket} /> Cerrar sesión</p>

              </div>
            </button>

            :
            <Link to="/auth">
              <button className={`ml-4 bg-${theme}-primary bg-opacity-20 py-2 px-4 rounded-md text-md font-bold text-${theme}-primary hover:bg-opacity-75 hover:text-${theme}-background transition`}>
                <FontAwesomeIcon icon={faArrowRightToBracket} /> Acceder
              </button>
            </Link>
        }


      </div>
    </nav >
  )
}

export default Navbar;

Navbar.propTypes = {
  sound: PropTypes.bool,
  setSound: PropTypes.func,
  setSettingsModalIsOpen: PropTypes.func,
  setThemeModalIsOpen: PropTypes.func
}