import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/Navbar/Navbar';

const HEADERS = ['Modo', 'Puntuación', 'Dificultad', 'Tipo', 'Velocidad', 'Precisión', 'Fecha'];

const History = ({ sound, setSound }) => {
  const { username } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/test/user/${username}`);
        if (response.status === 200) setHistory(response.data);
      } catch (e) {
        console.error('Error al obtener el historial:', e);
      }
    };
    fetchHistory();
  }, [username]);

  return (
    <div className="h-screen bg-kp-bg text-kp-text w-screen flex flex-col items-center gap-4">
      <Navbar sound={sound} setSound={setSound} />

      <h1 className="text-lg text-kp-muted h-10">
        Historial de{' '}
        <Link to={`/profile/${username}`} className="text-kp-accent hover:underline">
          {username} <FontAwesomeIcon className="text-xs" icon={faArrowUpRightFromSquare} />
        </Link>
      </h1>

      {history.length > 0 ? (
        <section className="max-h-[65vh] w-3/5 bg-kp-surface border border-kp-border rounded-xl overflow-y-auto">
          <div className="sticky top-0 bg-kp-surface border-b border-kp-border w-full flex px-4 py-3">
            {HEADERS.map((h, i) => (
              <p key={h} className={`text-xs font-medium uppercase text-kp-accent ${i < 6 ? 'w-1/6' : 'w-2/6'}`}>{h}</p>
            ))}
          </div>
          <div className="flex flex-col">
            {history.map((test, index) => (
              <Link
                to={`/test/${test.id}`}
                key={index}
                className="w-full flex items-center px-4 py-3 text-sm text-kp-text hover:bg-kp-border/30 transition-colors"
              >
                <p className="w-1/6">{test.settings.mode === 'practice' ? 'Práctica' : test.settings.mode === 'timed' ? 'Cronómetro' : 'Competitivo'}</p>
                <p className="w-1/6">{test.results.score}</p>
                <p className="w-1/6">{test.settings.difficulty === 'easy' ? 'Fácil' : test.settings.difficulty === 'medium' ? 'Medio' : 'Difícil'}</p>
                <p className="w-1/6">{test.settings.type === 'text' ? 'Texto' : 'Código'}</p>
                <p className="w-1/6">{test.results.speed} cpm</p>
                <p className="w-1/6">{test.results.accuracy} %</p>
                <p className="w-2/6 text-kp-muted">{test.date}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <p className="text-kp-muted">No hay registros</p>
      )}
    </div>
  );
};

History.propTypes = {
  sound: PropTypes.bool.isRequired,
  setSound: PropTypes.func.isRequired,
};

export default History;
