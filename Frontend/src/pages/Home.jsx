import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight, faGear, faPenToSquare, faChartSimple, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/Navbar/Navbar';
import GameSelector from '../components/GameSelector/GameSelector';
import TypingArea from '../components/TypingArea/TypingArea';
import Results from '../components/Results/Results';
import Timebar from '../components/Timebar/Timebar';
import Footer from '../components/Footer/Footer';

const INITIAL_GAME_RESULTS = {
  isReady: false, score: 0, ppm: 0, cpm: 0, accurate: 0, errors: 0, totalChar: 0, time: 0,
};

const INITIAL_SAVE_STATUS = { user: false, test: false };

const LANG_LABELS = {
  es: 'Español', en: 'English', python: 'Python',
  javascript: 'JavaScript', 'c++': 'C++', html: 'HTML', java: 'Java',
};

const Home = ({ sound, setSound }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [gameSettings, setGameSettings] = useState({
    mode: 'practice', type: 'text', difficulty: 'easy', length: 'medium', time: 60, language: 'es',
  });
  const [gameResults, setGameResults] = useState(INITIAL_GAME_RESULTS);
  const [saveStatus, setSaveStatus] = useState(INITIAL_SAVE_STATUS);
  const [timeRemaining, setTimeRemaining] = useState(gameSettings.time);

  useEffect(() => {
    if (!isRunning || gameSettings.mode !== 'timed') {
      setTimeRemaining(gameSettings.time);
      return;
    }
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => { clearInterval(interval); setTimeRemaining(gameSettings.time); };
  }, [isRunning, gameSettings.time]);

  if (sessionStorage.getItem('loggedIn') !== 'true') {
    sessionStorage.setItem('loggedIn', false);
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('userData', null);
  }

  const percent = Math.round((timeRemaining / gameSettings.time) * 100);
  const modeName = { practice: 'Práctica', timed: 'Cronómetro', competitive: 'Competitivo' }[gameSettings.mode];
  const typeName = { text: 'Texto', code: 'Código' }[gameSettings.type];
  const diffName = { easy: 'Fácil', medium: 'Medio', hard: 'Difícil' }[gameSettings.difficulty];

  return (
    <div className="bg-kp-bg text-kp-text w-screen h-screen flex flex-col items-center justify-evenly">
      <Navbar sound={sound} setSound={setSound} />

      <main className="w-full max-w-7xl h-4/5 p-2 flex flex-col items-center justify-center">
        {!gameResults.isReady && (
          <div className="w-3/5 flex flex-col items-center justify-between">
            <GameSelector gameSettings={gameSettings} setGameSettings={setGameSettings} />
          </div>
        )}

        {gameSettings.mode === 'timed' && !gameResults.isReady && (
          <Timebar percent={percent} />
        )}

        {!gameResults.isReady && (
          <div id="test-container" className="w-4/5 text-3xl tracking-wider leading-9">
            <TypingArea
              settings={gameSettings}
              sound={sound}
              timeRemaining={timeRemaining}
              onStart={() => { setIsRunning(true); setSaveStatus(INITIAL_SAVE_STATUS); }}
              onFinish={(results) => { setIsRunning(false); setGameResults(results); }}
              setAreResultsSaved={setSaveStatus}
            />
          </div>
        )}

        <Results results={gameResults} areResultsSaved={saveStatus} />

        {!gameResults.isReady && (
          <>
            <div className="flex gap-2 mt-8 flex-wrap justify-center">
              {[
                [faGear, modeName],
                [faPenToSquare, typeName],
                [faChartSimple, diffName],
                [faEarthAmericas, LANG_LABELS[gameSettings.language] ?? gameSettings.language],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-1.5 bg-kp-surface px-3 py-1.5 rounded-lg text-sm text-kp-muted">
                  <FontAwesomeIcon icon={icon} className="text-kp-accent" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <p className="mt-3 text-sm text-kp-muted">
              <FontAwesomeIcon icon={faArrowRotateRight} className="mr-1" />
              Presiona{' '}
              <kbd className="bg-kp-surface border border-kp-border px-2 py-0.5 rounded text-kp-text text-xs">Escape</kbd>
              {' '}para reiniciar
            </p>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

Home.propTypes = {
  sound: PropTypes.bool.isRequired,
  setSound: PropTypes.func.isRequired,
};

export default Home;
