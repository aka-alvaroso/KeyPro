// src/components/Navbar.jsx

import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrush } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { faVolumeXmark } from '@fortawesome/free-solid-svg-icons'


const Navbar = ({ sound, setSound, setSettingsModalIsOpen, setThemeModalIsOpen }) => {
  const { theme } = useTheme();

  return (
    <nav className="navbar w-4/5 h-1/5 flex items-center p-16">
      <div className='flex items-center justify-center'>
        <img className={`w-16 h-auto ${theme === 'lightOrange' || theme === 'lightGreen' || theme === 'lightBlue' ? 'invert' : ''}`} src='/logo.png' alt='logo' />
        <h2 className='text-2xl font-bold ml-4'>TypeMaster</h2>

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
      </div>
    </nav>
  )
}

export default Navbar;

Navbar.propTypes = {
  sound: PropTypes.bool,
  setSound: PropTypes.func,
  setSettingsModalIsOpen: PropTypes.func,
  setThemeModalIsOpen: PropTypes.func,
}