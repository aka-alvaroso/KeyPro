// src/pages/History.jsx
import axios from 'axios';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useParams, Link } from 'react-router-dom';


import Navbar from '../components/Navbar/Navbar'
import ThemeModal from '../components/ThemeModal/ThemeModal'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const History = ({ sound, setSound, themeModalIsOpen, setThemeModalIsOpen }) => {
  const { username } = useParams();

  const { theme, setTheme } = useTheme();
  const [history, setHistory] = useState([]);


  useEffect(() => {

    const fetchHistory = async () => {

      try {
        const response = await axios.get('http://localhost:3000/test/user/' + username);

        if (response.status !== 200) {
          console.error('Error al obtener el historial:', response);
          return
        }
        setHistory(response.data);

      } catch (e) {
        console.error('Error al obtener el historial:', e);

      }
    }

    fetchHistory();
  }, [username]);


  return (
    <div className={`h-screen bg-${theme}-background text-${theme}-text w-screen flex flex-col items-center gap-4`}>

      {/* Navbar */}
      <Navbar sound={sound} setSound={setSound} setThemeModalIsOpen={setThemeModalIsOpen} />


      <h1 className={`text-xl text-${theme}-text h-16`}>Historial de tests de
        <Link to={`/profile/${username}`}
          className={`text-${theme}-primary ml-2 hover:bg-${theme}-primary hover:bg-opacity-10 rounded-lg py-1 px-2`}>
          {username} <FontAwesomeIcon className='text-base' icon={faArrowUpRightFromSquare} />
        </Link>
      </h1>

      {history.length > 0 ?
        // <section className={`w-3/5 flex flex-wrap items-center justify-center bg-${theme}-primary bg-opacity-5 p-4 rounded-lg gap-4 mb-28`}>
        <section className={`max-h-[65vh] w-3/5 flex flex-wrap items-center justify-center bg-${theme}-primary bg-opacity-5 p-4 border-2 border-${theme}-primary rounded-lg gap-4 mb-28 overflow-y-auto`}>


          <div className={`w-full text-md text-center font-bold flex uppercase text-${theme}-primary`}>
            <p className='w-1/6'>Modo</p>
            <p className='w-1/6'>Puntuación</p>
            <p className='w-1/6'>Dificultad</p>
            <p className='w-1/6'>Tipo</p>
            <p className='w-1/6'>Velocidad</p>
            <p className='w-1/6'>Precisión</p>
            <p className='w-2/6'>Fecha</p>
          </div>

          <div className={`w-full text-md text-center flex flex-col text-${theme}-text`}>
            {
              history.map((test, index) => (
                <Link to={`/test/${test.id}`} key={index} className={`w-full flex items-center py-2 hover:bg-${theme}-primary hover:bg-opacity-10 rounded-lg gap-4`}>
                  <p className='w-1/6'>{test.settings.mode === 'practice' ? 'Práctica' : test.settings.mode === 'timed' ? 'Cronómetro' : 'Competitivo'}</p>
                  <p className='w-1/6'>{test.results.score}</p>
                  <p className='w-1/6'>{test.settings.difficulty === 'easy' ? 'Fácil' : test.settings.difficulty === 'medium' ? 'Medio' : 'Difícil'}</p>
                  <p className='w-1/6'>{test.settings.type === 'text' ? 'Texto' : 'Código'}</p>
                  <p className='w-1/6'>{test.results.speed} cpm</p>
                  <p className='w-1/6'>{test.results.accuracy} %</p>
                  <p className='w-2/6'>{test.date}</p>
                </Link>
              ))
            }

          </div>

        </section>

        :
        <h5 className={`h-screen text-lg text-${theme}-text`}>No hay registros</h5>
      }


      {/* Modales */}
      <ThemeModal isOpen={themeModalIsOpen} setIsOpen={setThemeModalIsOpen} theme={theme} setTheme={setTheme} />
    </div>


  );
}

export default History;

History.propTypes = {
  sound: PropTypes.bool.isRequired,
  setSound: PropTypes.func.isRequired,
  themeModalIsOpen: PropTypes.bool.isRequired,
  setThemeModalIsOpen: PropTypes.func.isRequired
}
