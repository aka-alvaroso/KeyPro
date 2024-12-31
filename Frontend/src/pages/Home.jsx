// src/pages/Home.jsx
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

import Navbar from '../components/Navbar/Navbar'
import GameSelector from '../components/GameSelector/GameSelector'
import Test from '../components/Test/Test'
import Results from '../components/Results/Results'
import ThemeModal from '../components/ThemeModal/ThemeModal'
import Timebar from '../components/Timebar/Timebar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight, faGear, faPenToSquare, faChartSimple, faEarthAmericas } from '@fortawesome/free-solid-svg-icons'


const Home = ({ sound, setSound, themeModalIsOpen, setThemeModalIsOpen }) => {
  const { theme, setTheme } = useTheme();
  const [testStarted, setTestStarted] = useState(false);


  const [gameSettings, setGameSettings] = useState({
    mode: 'practice',
    type: 'text',
    difficulty: 'easy',
    time: 60,
    numWords: 50,
    language: 'es',
  })

  const [results, setResults] = useState({
    isReady: false,
    score: 0,
    ppm: 0,
    cpm: 0,
    accurate: 0,
    errors: 0,
    totalChar: 0,
    time: 0
  })

  const [timeRemaining, setTimeRemaining] = useState(gameSettings.time);

  const [areResultsSaved, setAreResultsSaved] = useState({
    user: false,
    test: false
  });

  useEffect(() => {
    if (!testStarted || gameSettings.mode !== 'timed') {
      setTimeRemaining(gameSettings.time);
      return
    }

    const interval = setInterval(() => {

      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      })
    }, 1000);

    return () => {
      clearInterval(interval);
      setTimeRemaining(gameSettings.time);
    };
  }, [testStarted, gameSettings.time]);

  const percent = Math.round((timeRemaining / gameSettings.time) * 100);

  if (sessionStorage.getItem('loggedIn') !== 'true') {
    sessionStorage.setItem('loggedIn', false);
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('userData', null);
  }

  return (
    <div className={` bg-${theme}-background text-${theme}-text w-screen h-screen  flex flex-col items-center justify-evenly`}>

      {/* Navbar */}
      <Navbar sound={sound} setSound={setSound} setThemeModalIsOpen={setThemeModalIsOpen} isProfilePage={false} />

      <main className='w-full max-w-7xl h-4/5 p-2 flex flex-col items-center justify-center'>

        {/* Game Selector */}
        <div className={`${results['isReady'] ? 'hidden' : 'block'} w-3/5 flex flex-col items-center justify-between`}>
          <GameSelector gameSettings={gameSettings} setGameSettings={setGameSettings} />
        </div>

        {/* TimeBar */}
        {gameSettings.mode === 'timed' && !results['isReady'] ?
          <Timebar percent={percent} />
          : ''
        }

        {/* Test */}
        <div id="test-container" className={`${results['isReady'] ? 'hidden' : 'block'} w-4/5 text-3xl tracking-wider leading-9`}>
          <Test testStarted={testStarted} setTestStarted={setTestStarted} sound={sound} settings={gameSettings} testResults={results} setTestResults={setResults} timeRemaining={timeRemaining} setAreResultsSaved={setAreResultsSaved} />
        </div>

        {/* Results */}
        <Results results={results} areResultsSaved={areResultsSaved} />

        {/* Game-Configs Resume */}
        <div className={`flex gap-2 mt-8`}>

          <div className={`bg-${theme}-primary bg-opacity-20 p-2  rounded-md`}>
            <FontAwesomeIcon icon={faGear} className={`text-${theme}-accent px-2`} />
            <span className={`text-md font-bold text-${theme}-primary  `}>Modo: {
              gameSettings['mode'] === 'practice' ? 'Práctica' : gameSettings['mode'] === 'timed' ? 'Cronómetro' : 'Competitivo'
            }</span>
          </div>
          <div className={`bg-${theme}-primary bg-opacity-20 p-2  rounded-md`}>
            <FontAwesomeIcon icon={faPenToSquare} className={`text-${theme}-accent px-2`} />
            <span className={`text-md font-bold text-${theme}-primary`}>Tipo: {
              gameSettings['type'] === 'text' ? 'Texto' : gameSettings['type'] === 'code' ? 'Código' : 'Texto'
            }</span>
          </div>
          <div className={`bg-${theme}-primary bg-opacity-20 p-2  rounded-md`}>
            <FontAwesomeIcon icon={faChartSimple} className={`text-${theme}-accent px-2`} />
            <span className={`text-md font-bold text-${theme}-primary`}>Dificultad: {
              gameSettings['difficulty'] === 'easy' ? 'Fácil' : gameSettings['difficulty'] === 'medium' ? 'Medio' : 'Difícil'
            }</span>
          </div>
          <div className={`bg-${theme}-primary bg-opacity-20 p-2 rounded-md`}>
            <FontAwesomeIcon icon={faEarthAmericas} className={`text-${theme}-accent px-2`} />
            <span className={`text-md font-bold text-${theme}-primary  `}>Lenguaje: {
              gameSettings['language'] === 'es' ? 'Español'
                : gameSettings['language'] === 'en' ? 'English'
                  : gameSettings['language'] === 'python' ? 'Python'
                    : gameSettings['language'] === 'javascript' ? 'JavaScript'
                      : gameSettings['language'] === 'c++' ? 'C++'
                        : gameSettings['language'] === 'html' ? 'HTML'
                          : gameSettings['language'] === 'java' ? 'Java'
                            : 'Error'
            }</span>
          </div>
        </div>

        {/* Restart test */}
        <p className={`mt-2 text-${theme}-text text-md opacity-80`}><FontAwesomeIcon icon={faArrowRotateRight} /> Presiona <span className={`py-1 px-2 bg-${theme}-accent text-${theme}-text rounded-lg`}>Escape</span> para reiniciar</p>

      </main >


      <footer className={`w-full h-1/5 mt-auto flex items-center justify-center text-${theme}-text opacity-30`}>
        <Link to="/about">Acerca de TypeMaster</Link>
        <p>&nbsp; | &nbsp;</p>
        <p>Versión 0.0.1</p>
      </footer>


      {/* Modales */}
      <ThemeModal isOpen={themeModalIsOpen} setIsOpen={setThemeModalIsOpen} theme={theme} setTheme={setTheme} />

    </div >
  );
};


export default Home;

Home.propTypes = {
  sound: PropTypes.bool.isRequired,
  setSound: PropTypes.func.isRequired,
  themeModalIsOpen: PropTypes.bool.isRequired,
  setThemeModalIsOpen: PropTypes.func.isRequired
}
