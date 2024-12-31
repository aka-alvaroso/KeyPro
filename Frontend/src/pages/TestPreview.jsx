// src/pages/History.jsx
import axios from 'axios';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link, useParams } from 'react-router-dom';


import Navbar from '../components/Navbar/Navbar'
import ThemeModal from '../components/ThemeModal/ThemeModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const TestPreview = ({ sound, setSound, themeModalIsOpen, setThemeModalIsOpen }) => {
  const { id } = useParams();

  const { theme, setTheme } = useTheme();
  const [test, setTest] = useState(undefined);


  useEffect(() => {

    const fetchHistory = async () => {

      try {
        const response = await axios.get('http://localhost:3000/test/get/' + id);

        if (response.status !== 200) {
          console.error('Error al obtener el test:', response);
          return
        }

        // console.log('Test:', response.data);
        setTest(response.data);
      } catch (e) {
        console.error('Error al obtener el test:', e);

      }
    }

    fetchHistory();
  }, [id]);


  const renderText = () => {
    return test.text.split('').map((char, index) => {
      let className = '';

      className = test.charResults[index] === 'correct' ? 'transition text-green-600 underline ' : 'transition text-red-600  underline';
      return (
        <span key={index} className={`${className}`}>
          {char}
        </span>
      );

    });
  }

  return (
    <div className={` bg-${theme}-background text-${theme}-text w-screen h-screen flex flex-col items-center gap-4`}>

      {/* Navbar */}
      <Navbar sound={sound} setSound={setSound} setThemeModalIsOpen={setThemeModalIsOpen} />

      {test != null || test != undefined ?

        <main className='w-full flex items-center'>
          <section className={`w-4/6 flex flex-col items-center gap-4 p-4`}>
            <div className='w-full flex flex-col items-center gap-4'>
              <p className={` font-bold text-3xl text-left w-4/6`}>Información del test</p>
              <div id="test-container" className={`w-4/6 text-3xl tracking-wider leading-9`}>
                {renderText()}
              </div>
            </div>

            <div className='w-full flex flex-col items-center gap-4 mt-8 '>
              <p className={` font-bold text-3xl text-left w-4/6`}>Resultados</p>
              <div className={`w-4/6 rounded-lg grid grid-cols-3 gap-2`}>
                <section className={`rounded-lg p-2 border-2 border-${theme}-primary`}>
                  <p className={`text-${theme}-text`}>Puntuación</p>
                  <p className='text-center text-7xl font-bold'>{test.results['score']}
                    <span className={`text-2xl font-bold text-${theme}-primary`}>pts.</span>
                  </p>
                </section>
                <section className={`relative rounded-lg p-2 border-2 border-${theme}-primary`}>
                  <p className={`text-${theme}-text`}>Velocidad </p>
                  <p className='text-center text-7xl font-bold'>{test.results['speed']}
                    <span className={`text-2xl font-bold text-${theme}-primary`}>CPM</span>
                  </p>
                </section>
                <section className={`rounded-lg p-2 border-2 border-${theme}-primary`}>
                  <p className={`text-${theme}-text`}>Precisión</p>
                  <p className='text-center text-7xl font-bold'>{test.results['accuracy']}
                    <span className={`text-2xl font-bold text-${theme}-primary`}>%</span>
                  </p>
                </section>
                <section className={`rounded-lg p-2 border-2 border-${theme}-primary`}>
                  <p className={`text-${theme}-text`}>Número de errores</p>
                  <p className='text-center text-7xl font-bold'>{test.results['numErrors']}
                    <span className={`text-2xl font-bold text-${theme}-primary`}>err.</span>
                  </p>
                </section>
                <section className={`rounded-lg p-2 border-2 border-${theme}-primary`}>
                  <p className={`text-${theme}-text`}>Tiempo</p>
                  <p className='text-center text-7xl font-bold'>{test.results['time']}
                    <span className={`text-2xl font-bold text-${theme}-primary`}>seg.</span>
                  </p>
                </section>
                <section className={`rounded-lg p-2 border-2 border-${theme}-primary`}>
                  <p className={`text-${theme}-text`}>Caracteres escritos</p>
                  <p className='text-center text-7xl font-bold'>{test.results['numCharacters']}
                    <span className={`text-2xl font-bold text-${theme}-primary`}>car.</span>
                  </p>
                </section>
              </div>
            </div>

          </section>

          <section className={`w-2/6 h-full flex flex-col justify-center gap-4 p-4`}>

            <div className={`w-5/6 flex flex-col items-center gap-4 bg-${theme}-primary bg-opacity-5 rounded-lg py-12 px-4`}>
              <p className={`font-bold text-3xl text-left`}>Otros datos</p>

              {/* 
                Jugador
                Fecha
                Modo
                Tipo
                Dificultad
                Lenguaje              
              */}
              <div className={`w-full mt-1 flex gap-2 items-center`}>
                <p className={`ml-1 text-${theme}-text bg-${theme}-primary bg-opacity-70 py-1 px-2 rounded`}>Jugador</p>
                <Link
                  to={`/profile/${test.player}`}
                  className={`ml-1 text-${theme}-text bg-${theme}-primary bg-opacity-20 py-1 px-2 rounded hover:text-${theme}-primary transition`}>
                  {test.player}
                  <FontAwesomeIcon className='text-xs ml-2' icon={faArrowUpRightFromSquare} />
                </Link>
              </div>

              <div className={`w-full mt-1 flex gap-2 items-center`}>
                <p className={`ml-1 text-${theme}-text bg-${theme}-primary bg-opacity-70 py-1 px-2 rounded`}>Fecha</p>
                <p className={`ml-1 text-${theme}-text bg-${theme}-primary bg-opacity-20 py-1 px-2 rounded`}>{test.date}</p>
              </div>

              <div className={`w-full mt-1 flex gap-2 items-center`}>
                <p className={`ml-1 text-${theme}-text bg-${theme}-primary bg-opacity-70 py-1 px-2 rounded`}>Modo</p>
                <p className={`ml-1 text-${theme}-text bg-${theme}-primary bg-opacity-20 py-1 px-2 rounded`}>{test.settings.mode}</p>
              </div>

              <div className={`w-full mt-1 flex gap-2 items-center`}>
                <p className={`ml-1 text-${theme}-text bg-${theme}-primary bg-opacity-70 py-1 px-2 rounded`}>Tipo</p>
                <p className={`ml-1 text-${theme}-text bg-${theme}-primary bg-opacity-20 py-1 px-2 rounded`}>{test.settings.type}</p>
              </div>

              <div className={`w-full mt-1 flex gap-2 items-center`}>
                <p className={`ml-1 text-${theme}-text bg-${theme}-primary bg-opacity-70 py-1 px-2 rounded`}>Dificultad</p>
                <p className={`ml-1 text-${theme}-text bg-${theme}-primary bg-opacity-20 py-1 px-2 rounded`}>{test.settings.difficulty}</p>
              </div>

              <div className={`w-full mt-1 flex gap-2 items-center`}>
                <p className={`ml-1 text-${theme}-text bg-${theme}-primary bg-opacity-70 py-1 px-2 rounded`}>Lenguaje</p>
                <p className={`ml-1 text-${theme}-text bg-${theme}-primary bg-opacity-20 py-1 px-2 rounded`}>{test.settings.language}</p>
              </div>

            </div>

          </section>
        </main>
        :
        <h5 className={`text-lg text-${theme}-text`}>No hay datos</h5>

      }


      {/* Modales */}
      <ThemeModal isOpen={themeModalIsOpen} setIsOpen={setThemeModalIsOpen} theme={theme} setTheme={setTheme} />
    </div>


  );
}

export default TestPreview;

TestPreview.propTypes = {
  sound: PropTypes.bool.isRequired,
  setSound: PropTypes.func.isRequired,
  themeModalIsOpen: PropTypes.bool.isRequired,
  setThemeModalIsOpen: PropTypes.func.isRequired
}
