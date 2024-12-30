// src/components/Navbar.jsx

import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faBrush, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { faVolumeXmark } from '@fortawesome/free-solid-svg-icons'


const Navbar = ({ sound, setSound, setSettingsModalIsOpen, setThemeModalIsOpen, isProfilePage }) => {
  const { theme } = useTheme();

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
          onClick={() => setSettingsModalIsOpen(true)}>
          <FontAwesomeIcon icon={faGear} />
        </button>
      </div>
      <div className='ml-auto'>
        <button onClick={() => setSound(!sound)}
          className={`ml-4 text-xl text-${theme}-text border-none hover:text-${theme}-primary hover:cursor-pointer transition`}>
          {sound ? <FontAwesomeIcon icon={faVolumeHigh} /> : <FontAwesomeIcon icon={faVolumeXmark} />}
        </button>

        {isProfilePage ?
          <Link to="/">
            <button className={`bg-red-950 border-2 border-red-600 text-red-600 py-2 px-4 rounded-lg ml-4`}
              onClick={() => {
                sessionStorage.removeItem('userData');
                sessionStorage.removeItem('token');
                sessionStorage.setItem('loggedIn', false);
              }}>
              <p><FontAwesomeIcon icon={faRightFromBracket} /> Cerrar sesión </p>
            </button>
          </Link>
          :
          sessionStorage.getItem('loggedIn') === 'true' ?
            <Link to={`/profile/${JSON.parse(sessionStorage.getItem('userData')).username}`} >
              <button className={`ml-4 bg-${theme}-primary bg-opacity-20 py-2 px-4 rounded-md text-md font-bold text-${theme}-primary hover:bg-opacity-75 hover:text-${theme}-background transition`}>
                <FontAwesomeIcon icon={faArrowRightToBracket} /> Perfil
              </button>
            </Link>
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
  setThemeModalIsOpen: PropTypes.func,
  isProfilePage: PropTypes.bool
}