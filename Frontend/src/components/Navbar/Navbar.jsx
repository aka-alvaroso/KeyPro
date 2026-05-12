import PropTypes from 'prop-types';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faChevronDown,
  faCrown,
  faUser,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ sound, setSound }) => {
  const navigate = useNavigate();
  const [isSubMenuOpened, setIsSubMenuOpened] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    imageURL: 'https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (sessionStorage.getItem('loggedIn') === 'true') {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/data`,
            { headers: { username: JSON.parse(sessionStorage.getItem('userData')).username } }
          );
          if (response.status === 200) setUserData(response.data.user);
        }
      } catch (e) {
        console.error('Error al obtener el usuario:', e);
      }
    };
    fetchUser();
  }, []);

  return (
    <nav className="w-4/5 flex items-center py-8 px-4">
      <div className="flex items-center gap-4">
        <Link className="flex items-center gap-3" to="/">
          <img className="w-10 h-auto" src="/keypro/logo.png" alt="logo" />
          <span className="text-xl font-medium text-kp-text tracking-tight">KeyPro</span>
        </Link>

        <button
          className="text-kp-muted hover:text-kp-accent transition-colors"
          onClick={() => navigate('/rankings')}
        >
          <FontAwesomeIcon icon={faCrown} />
        </button>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={() => setSound(!sound)}
          className="text-kp-muted hover:text-kp-accent transition-colors"
        >
          <FontAwesomeIcon icon={sound ? faVolumeHigh : faVolumeXmark} />
        </button>

        {sessionStorage.getItem('loggedIn') === 'true' ? (
          <div className="relative">
            <button
              onClick={() => setIsSubMenuOpened(!isSubMenuOpened)}
              className="flex items-center gap-2 bg-kp-surface px-3 py-2 rounded-lg text-sm font-medium text-kp-text hover:bg-kp-border transition-colors"
            >
              <img src={userData.imageURL} className="w-6 h-6 rounded-full object-cover" alt="profile" />
              <span>{JSON.parse(sessionStorage.getItem('userData')).username}</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-xs transition-transform ${isSubMenuOpened ? 'rotate-0' : '-rotate-90'}`}
              />
            </button>

            {isSubMenuOpened && (
              <div className="absolute top-full right-0 mt-2 bg-kp-bg border border-kp-border rounded-xl shadow-lg p-2 min-w-40 z-50">
                <Link
                  to={`/profile/${JSON.parse(sessionStorage.getItem('userData')).username}`}
                  onClick={() => setIsSubMenuOpened(false)}
                >
                  <p className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm text-kp-text hover:bg-kp-surface transition-colors">
                    <FontAwesomeIcon icon={faUser} /> Mi perfil
                  </p>
                </Link>
                <p
                  onClick={() => {
                    sessionStorage.setItem('loggedIn', 'false');
                    sessionStorage.removeItem('userData');
                    sessionStorage.removeItem('token');
                    setIsSubMenuOpened(false);
                    navigate('/');
                  }}
                  className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm text-kp-text hover:bg-kp-surface transition-colors cursor-pointer"
                >
                  <FontAwesomeIcon icon={faArrowRightToBracket} /> Cerrar sesión
                </p>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth">
            <button className="flex items-center gap-2 bg-kp-accent text-kp-text px-4 py-2 rounded-lg text-sm font-medium hover:brightness-105 transition-all">
              <FontAwesomeIcon icon={faArrowRightToBracket} /> Acceder
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  sound: PropTypes.bool,
  setSound: PropTypes.func,
};

export default Navbar;
