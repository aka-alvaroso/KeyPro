// src/pages/Profile.jsx
import axios from 'axios';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useParams, useNavigate } from 'react-router-dom';


import Navbar from '../components/Navbar/Navbar'
import ThemeModal from '../components/ThemeModal/ThemeModal'
import SettingsModal from '../components/SettingsModal/SettingsModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Profile = ({ sound, setSound, themeModalIsOpen, setThemeModalIsOpen, settingsModalIsOpen, setSettingsModalIsOpen }) => {
  const { username } = useParams();
  const navigate = useNavigate();

  const { theme, setTheme } = useTheme();
  const [velocityType, setVelocityType] = useState('ppm')
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
      totalTests: 0
    }
  })


  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/data', {
          headers: {
            // email: JSON.parse(sessionStorage.getItem('userData')).email
            username
          }
        });

        if (response.status !== 200) {
          console.error('Error al obtener el usuario:', response);
          return
        }

        setUserData(response.data.user);


      } catch (e) {
        console.error('Error al obtener el usuario:', e);
      }
    }

    fetchUser();
  }, [])


  return (
    <div className={` bg-${theme}-background text-${theme}-text w-screen h-screen flex flex-col items-center gap-4`}>

      {/* Navbar */}
      <Navbar sound={sound} setSound={setSound} setThemeModalIsOpen={setThemeModalIsOpen} setSettingsModalIsOpen={setSettingsModalIsOpen} isProfilePage={true} />

      <section className="w-4/5 flex items-center justify-center gap-4">
        <div className={`w-2/5 h-60 flex flex-col items-center justify-center bg-${theme}-primary bg-opacity-5 p-4 rounded-lg`}>
          <img className='w-28 h-28 rounded-full' src="https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp" alt="Profile image" />
          <h2 className='text-2xl font-bold mt-4'>{userData.username}</h2>
          <p className={`text-lg text-${theme}-primary opacity-70`}>(ToDo) #raking - Global</p>
        </div>
        <div className={`w-3/5 h-60 flex items-center justify-center bg-${theme}-primary bg-opacity-5 p-4 rounded-lg gap-4`}>
          <div className={`w-1/3 rounded-lg p-2 border-2 border-${theme}-primary`}>
            <p className={`text-${theme}-text`}>Puntuación media</p>
            <p className='text-center text-7xl font-bold'>{userData.stats.avgScore}
              <span className={`text-2xl font-bold text-${theme}-primary`}>pts.</span>
            </p>
          </div>
          <div className={`w-1/3 relative rounded-lg p-2 border-2 border-${theme}-primary`}>
            <button onClick={() => setVelocityType(velocityType === 'ppm' ? 'cpm' : 'ppm')}
              className={`absolute top-2 right-4 hover:text-${theme}-primary transition`}>
              <FontAwesomeIcon icon={faArrowRightArrowLeft} />
            </button>
            <p className={`text-${theme}-text`}>Velocidad media</p>
            {velocityType === 'ppm'
              ? <p className='text-center text-7xl font-bold'>{userData.stats.avgSpeed / 5}
                <span className={`text-2xl font-bold text-${theme}-primary`}>PPM</span>
              </p>
              : <p className='text-center text-7xl font-bold'>{userData.stats.avgSpeed}
                <span className={`text-2xl font-bold text-${theme}-primary`}>CPM</span>
              </p>
            }
          </div>
          <div className={`w-1/3 rounded-lg p-2 border-2 border-${theme}-primary`}>
            <p className={`text-${theme}-text`}>Precisión media</p>
            <p className='text-center text-7xl font-bold'>{userData.stats.avgAccuracy}
              <span className={`text-2xl font-bold text-${theme}-primary`}>%</span>
            </p>
          </div>
        </div>
      </section>

      <section className={`w-4/5 h-72 flex flex-wrap items-center justify-center bg-${theme}-primary bg-opacity-5 p-4 rounded-lg gap-4`}>
        <div className={`w-1/5 rounded-lg p-2 border-2 border-${theme}-primary`}>
          <p className={`text-${theme}-text`}>Mejor puntuación</p>
          <p className='text-center text-7xl font-bold'>{userData.stats.bestScore}
            <span className={`text-2xl font-bold text-${theme}-primary`}>pts.</span>
          </p>
        </div>
        <div className={`w-1/5 relative rounded-lg p-2 border-2 border-${theme}-primary`}>
          <button onClick={() => setVelocityType(velocityType === 'ppm' ? 'cpm' : 'ppm')}
            className={`absolute top-2 right-4 hover:text-${theme}-primary transition`}>
            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
          </button>
          <p className={`text-${theme}-text`}>Mejor velocidad</p>
          {velocityType === 'ppm'
            ? <p className='text-center text-7xl font-bold'>{userData.stats.bestSpeed / 5}
              <span className={`text-2xl font-bold text-${theme}-primary`}>PPM</span>
            </p>
            : <p className='text-center text-7xl font-bold'>{userData.stats.bestSpeed}
              <span className={`text-2xl font-bold text-${theme}-primary`}>CPM</span>
            </p>
          }
        </div>
        <div className={`w-1/5 rounded-lg p-2 border-2 border-${theme}-primary`}>
          <p className={`text-${theme}-text`}>Tests jugados</p>
          <p className='text-center text-7xl font-bold'>{userData.stats.totalTests}
          </p>
        </div>
        <div className={`w-1/5 rounded-lg p-2 border-2 border-${theme}-primary`}>
          <p className={`text-${theme}-text`}>Número de errores</p>
          <p className='text-center text-7xl font-bold'>{userData.stats.numErrors}
          </p>
        </div>

        {/* --------------- */}

        <div className={`w-1/5 rounded-lg p-2 border-2 border-${theme}-primary`}>
          <p className={`text-${theme}-text`}>Número de caracteres</p>
          <p className='text-center text-7xl font-bold'>{userData.stats.numCharacters}
          </p>
        </div>
        <div className={`w-1/5 rounded-lg p-2 border-2 border-${theme}-primary`}>
          <p className={`text-${theme}-text`}>Tests fáciles jugados</p>
          <p className='text-center text-7xl font-bold'>{userData.stats.numEasyTests}
          </p>
        </div>
        <div className={`w-1/5 rounded-lg p-2 border-2 border-${theme}-primary`}>
          <p className={`text-${theme}-text`}>Tests medios jugados</p>
          <p className='text-center text-7xl font-bold'>{userData.stats.numMediumTests}
          </p>
        </div>
        <div className={`w-1/5 rounded-lg p-2 border-2 border-${theme}-primary`}>
          <p className={`text-${theme}-text`}>Tests difíciles jugados</p>
          <p className='text-center text-7xl font-bold'>{userData.stats.numHardTests}
          </p>
        </div>

      </section>

      <button className={`bg-red-950 border-2 border-red-600 text-red-600 py-2 px-4 rounded-lg `}
        onClick={() => {
          sessionStorage.removeItem('userData');
          sessionStorage.removeItem('token');
          sessionStorage.setItem('loggedIn', false);
          navigate('/');
        }}>
        <p><FontAwesomeIcon icon={faRightFromBracket} /> Cerrar sesión </p>
      </button>


      {/* Modales */}
      <ThemeModal isOpen={themeModalIsOpen} setIsOpen={setThemeModalIsOpen} theme={theme} setTheme={setTheme} />
      <SettingsModal isOpen={settingsModalIsOpen} setIsOpen={setSettingsModalIsOpen} />
    </div>


  );
}

export default Profile;

Profile.propTypes = {
  sound: PropTypes.bool.isRequired,
  setSound: PropTypes.func.isRequired,
  themeModalIsOpen: PropTypes.bool.isRequired,
  setThemeModalIsOpen: PropTypes.func.isRequired,
  settingsModalIsOpen: PropTypes.bool.isRequired,
  setSettingsModalIsOpen: PropTypes.func.isRequired
}
