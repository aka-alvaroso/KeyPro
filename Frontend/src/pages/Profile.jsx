import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faEdit, faList } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/Navbar/Navbar';
import EditProfileModal from '../components/EditProfileModal/EditProfileModal';
import StatCard from '../components/ui/StatCard';
import Button from '../components/ui/Button';

const DEFAULT_USER = {
  username: '',
  avgScore: 0, avgAccuracy: 0, avgSpeed: 0,
  bestScore: 0, bestSpeed: 0,
  totalTests: 0, numErrors: 0, numCharacters: 0,
  numEasyTests: 0, numMediumTests: 0, numHardTests: 0,
  imageURL: 'https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp',
};

const Profile = ({ sound, setSound }) => {
  const { username } = useParams();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [velocityType, setVelocityType] = useState('ppm');
  const [userData, setUserData] = useState(DEFAULT_USER);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/data`, { headers: { username } });
        if (response.status === 200) setUserData(response.data.user);
      } catch (e) {
        console.error('Error al obtener el usuario:', e);
      }
    };
    fetchUser();
  }, [username]);

  const isOwner = sessionStorage.getItem('loggedIn') === 'true' &&
    userData.username === JSON.parse(sessionStorage.getItem('userData') || '{}').username;

  const toggleVelocity = () => setVelocityType(v => v === 'ppm' ? 'cpm' : 'ppm');

  return (
    <div className="bg-kp-bg text-kp-text w-screen h-screen flex flex-col items-center gap-4">
      <Navbar sound={sound} setSound={setSound} />

      <section className="w-4/5 flex items-center justify-center gap-4">
        <div className="w-2/5 h-60 flex flex-col items-center justify-center bg-kp-surface rounded-xl p-4">
          <img className="w-28 h-28 rounded-full object-cover border-2 border-kp-border" src={userData.imageURL} alt="Profile" />
          <h2 className="text-xl font-medium mt-4">{userData.username}</h2>
        </div>
        <div className="w-3/5 h-60 grid grid-cols-3 gap-3">
          <StatCard label="Puntuación media" value={userData.avgScore} unit="pts." />
          <StatCard label="Velocidad media" className="relative">
            <button onClick={toggleVelocity} className="absolute top-3 right-3 text-kp-muted hover:text-kp-accent transition-colors">
              <FontAwesomeIcon icon={faArrowRightArrowLeft} className="text-xs" />
            </button>
            <p className="text-center text-5xl font-medium text-kp-text">
              {velocityType === 'ppm' ? Math.trunc((userData.avgSpeed / 5) * 10) / 10 : userData.avgSpeed}
              <span className="text-lg font-medium text-kp-accent ml-1">{velocityType.toUpperCase()}</span>
            </p>
          </StatCard>
          <StatCard label="Precisión media" value={userData.avgAccuracy} unit="%" />
        </div>
      </section>

      <section className="w-4/5 flex flex-wrap items-center justify-center bg-kp-surface rounded-xl p-4 gap-3">
        <StatCard label="Mejor puntuación" value={userData.bestScore} unit="pts." className="w-1/5" />
        <StatCard label="Mejor velocidad" className="w-1/5 relative">
          <button onClick={toggleVelocity} className="absolute top-3 right-3 text-kp-muted hover:text-kp-accent transition-colors">
            <FontAwesomeIcon icon={faArrowRightArrowLeft} className="text-xs" />
          </button>
          <p className="text-center text-5xl font-medium text-kp-text">
            {velocityType === 'ppm' ? userData.bestSpeed / 5 : userData.bestSpeed}
            <span className="text-lg font-medium text-kp-accent ml-1">{velocityType.toUpperCase()}</span>
          </p>
        </StatCard>
        <StatCard label="Tests jugados" value={userData.totalTests} className="w-1/5" />
        <StatCard label="Número de errores" value={userData.numErrors} className="w-1/5" />
        <StatCard label="Caracteres escritos" value={userData.numCharacters} className="w-1/5" />
        <StatCard label="Tests fáciles" value={userData.numEasyTests} className="w-1/5" />
        <StatCard label="Tests medios" value={userData.numMediumTests} className="w-1/5" />
        <StatCard label="Tests difíciles" value={userData.numHardTests} className="w-1/5" />
      </section>

      <div className="flex gap-3">
        {isOwner && (
          <Button variant="subtle" onClick={() => setIsProfileModalOpen(true)}>
            <FontAwesomeIcon icon={faEdit} /> Editar perfil
          </Button>
        )}
        <Link to={`/history/${username}`}>
          <Button variant="subtle">
            <FontAwesomeIcon icon={faList} /> Historial
          </Button>
        </Link>
      </div>

      <EditProfileModal
        isOpen={isProfileModalOpen}
        setIsOpen={setIsProfileModalOpen}
        userData={userData}
        setUserData={setUserData}
      />
    </div>
  );
};

Profile.propTypes = {
  sound: PropTypes.bool.isRequired,
  setSound: PropTypes.func.isRequired,
};

export default Profile;
