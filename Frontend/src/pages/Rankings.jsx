// src/pages/Rankings.jsx
import axios from 'axios';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';


import Navbar from '../components/Navbar/Navbar'
import ThemeModal from '../components/ThemeModal/ThemeModal'
import { Link } from 'react-router-dom';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Rankings = ({ sound, setSound, themeModalIsOpen, setThemeModalIsOpen }) => {

  const { theme, setTheme } = useTheme();

  const [ranking, setRanking] = useState([]);
  const [orderBy, setOrderBy] = useState('bestScore'); // bestScore, bestSpeed, avgScore, avgSpeed, avgAccuracy, totalTests


  useEffect(() => {

    const fetchHistory = async () => {

      try {
        const response = await axios.get(`http://localhost:3000/ranking/${orderBy}`);


        if (response.status !== 200) {
          console.error('Error al obtener el ranking:', response);
          return
        }
        setRanking(response.data);

      } catch (e) {
        console.error('Error al obtener el ranking:', e);
      }
    }

    fetchHistory();
  }, [orderBy]);


  return (
    <div className={`h-screen bg-${theme}-background text-${theme}-text w-screen flex flex-col items-center gap-4`}>

      {/* Navbar */}
      <Navbar sound={sound} setSound={setSound} setThemeModalIsOpen={setThemeModalIsOpen} />


      <h1 className={`text-3xl text-${theme}-text h-16`}>
        Rankings
      </h1>

      <section className={`max-w-7xl bg-${theme}-primary bg-opacity-20 text-${theme}-text p-4 rounded-lg`}>
        <h3 className='text-lg text-center'>Ordenar por:</h3>

        <div className='flex flex-wrap gap-4 justify-center'>

          <button
            className={`${orderBy === 'bestScore' ? 'bg-opacity-50 bg-' + theme + '-primary' : 'bg-opacity-20'} text-center text-sm text-white rounded-lg py-2 px-4 hover:bg-opacity-10 hover:bg-${theme}-primary`}
            onClick={() => setOrderBy('bestScore')}>
            Mejor puntuación
          </button>
          <button
            className={`${orderBy === 'bestSpeed' ? 'bg-opacity-50 bg-' + theme + '-primary' : 'bg-opacity-20'} text-center text-sm text-white rounded-lg py-2 px-4 hover:bg-opacity-10 hover:bg-${theme}-primary`}
            onClick={() => setOrderBy('bestSpeed')}>
            Mejor velocidad
          </button>
          <button
            className={`${orderBy === 'avgScore' ? 'bg-opacity-50 bg-' + theme + '-primary' : 'bg-opacity-20'} text-center text-sm text-white rounded-lg py-2 px-4 hover:bg-opacity-10 hover:bg-${theme}-primary`}
            onClick={() => setOrderBy('avgScore')}>
            Puntuación media
          </button>
          <button
            className={`${orderBy === 'avgSpeed' ? 'bg-opacity-50 bg-' + theme + '-primary' : 'bg-opacity-20'} text-center text-sm text-white rounded-lg py-2 px-4 hover:bg-opacity-10 hover:bg-${theme}-primary`}
            onClick={() => setOrderBy('avgSpeed')}>
            Velocidad media
          </button>
          <button
            className={`${orderBy === 'avgAccuracy' ? 'bg-opacity-50 bg-' + theme + '-primary' : 'bg-opacity-20'} text-center text-sm text-white rounded-lg py-2 px-4 hover:bg-opacity-10 hover:bg-${theme}-primary`}
            onClick={() => setOrderBy('avgAccuracy')}>
            Precisión media
          </button>
          <button
            className={`${orderBy === 'totalTests' ? 'bg-opacity-50 bg-' + theme + '-primary' : 'bg-opacity-20'} text-center text-sm text-white rounded-lg py-2 px-4 hover:bg-opacity-10 hover:bg-${theme}-primary`}
            onClick={() => setOrderBy('totalTests')}>
            Tests jugados
          </button>

        </div>

      </section>

      {ranking.length > 0 ?
        <section className={`max-h-[65vh] w-3/5 flex flex-wrap items-center justify-center bg-${theme}-primary bg-opacity-5 p-4 border-2 border-${theme}-primary rounded-lg gap-4 mb-28 overflow-y-auto`} >

          <div className={`w-full text-md text-center font-bold flex uppercase text-${theme}-primary`}>
            <p className='w-[12.5%]'>Posición</p>
            <p className='w-[12.5%]'>Usuario</p>
            <p className='w-[12.5%]'>Mejor puntuación</p>
            <p className='w-[12.5%]'>Mejor velocidad</p>
            <p className='w-[12.5%]'>Puntuación media</p>
            <p className='w-[12.5%]'>Velocidad media</p>
            <p className='w-[12.5%]'>Precisión media</p>
            <p className='w-[12.5%]'>Tests jugados</p>
          </div>

          <div className={`w-full text-md text-center flex flex-col text-${theme}-text rounded-lg`}>
            {
              ranking.map((user, index) => (
                <div
                  key={index}
                  className={`bg-${theme}-primary w-full flex items-center py-2 gap-4
                    ${index % 2 === 0 ? 'bg-opacity-10' : 'bg-opacity-5'}
                    ${JSON.parse(sessionStorage.getItem('userData'))
                      ? user.username === JSON.parse(sessionStorage.getItem('userData')).username
                        ? `text-${theme}-primary`
                        : `text-${theme}-text`
                      : `text-${theme}-text`}
                  `}>

                  <p className='w-[12.5%]'>#{index + 1}</p>
                  <Link
                    to={`/profile/${user.username}`}
                    className='w-[12.5%] hover:underline'>
                    {user.username}
                    <FontAwesomeIcon className='text-xs ml-2' icon={faArrowUpRightFromSquare} />
                  </Link>
                  <p className='w-[12.5%]'>{user.stats.bestScore}</p>
                  <p className='w-[12.5%]'>{user.stats.bestSpeed}</p>
                  <p className='w-[12.5%]'>{user.stats.avgScore}</p>
                  <p className='w-[12.5%]'>{user.stats.avgSpeed}</p>
                  <p className='w-[12.5%]'>{user.stats.avgAccuracy}</p>
                  <p className='w-[12.5%]'>{user.stats.totalTests}</p>
                </div>
              ))
            }

          </div>

        </section>

        :

        <h5 className={`h-screen text-lg text-${theme}-text`}>No hay datos</h5>
      }


      {/* Modales */}
      <ThemeModal isOpen={themeModalIsOpen} setIsOpen={setThemeModalIsOpen} theme={theme} setTheme={setTheme} />
    </div>


  );
}

export default Rankings;

Rankings.propTypes = {
  sound: PropTypes.bool.isRequired,
  setSound: PropTypes.func.isRequired,
  themeModalIsOpen: PropTypes.bool.isRequired,
  setThemeModalIsOpen: PropTypes.func.isRequired
}
