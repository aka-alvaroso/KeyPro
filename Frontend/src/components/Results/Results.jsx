import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Results = ({ results }) => {
  const { theme } = useTheme();
  const [velocityType, setVelocityType] = useState('ppm')

  window.addEventListener('keydown', (event) => {

    if (event.key !== 'Escape') {
      return
    }

  })

  return (
    <>
      <p className={`${results['isReady'] ? 'block' : 'hidden'} font-bold text-3xl text-left w-4/6`}>Resultados</p>
      <div className={`${results['isReady'] ? 'block' : 'hidden'} mt-8 w-4/6 rounded-lg grid grid-cols-3 gap-2`}>
        <section className={`rounded-lg p-2 border-2 border-${theme}-primary`}>
          <p className={`text-${theme}-text`}>Puntuación</p>
          <p className='text-center text-7xl font-bold'>{results['score']}
            <span className={`text-2xl font-bold text-${theme}-primary`}>pts.</span>
          </p>
        </section>
        <section className={`relative rounded-lg p-2 border-2 border-${theme}-primary`}>
          <button onClick={() => setVelocityType(velocityType === 'ppm' ? 'cpm' : 'ppm')}
            className={`absolute top-2 right-4 hover:text-${theme}-primary transition`}>
            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
          </button>
          <p className={`text-${theme}-text`}>Velocidad </p>
          {velocityType === 'ppm'
            ? <p className='text-center text-7xl font-bold'>{results['ppm']}
              <span className={`text-2xl font-bold text-${theme}-primary`}>PPM</span>
            </p>
            : <p className='text-center text-7xl font-bold'>{results['cpm']}
              <span className={`text-2xl font-bold text-${theme}-primary`}>CPM</span>
            </p>
          }
        </section>
        <section className={`rounded-lg p-2 border-2 border-${theme}-primary`}>
          <p className={`text-${theme}-text`}>Precisión</p>
          <p className='text-center text-7xl font-bold'>{results['accurate']}
            <span className={`text-2xl font-bold text-${theme}-primary`}>%</span>
          </p>
        </section>
        <section className={`rounded-lg p-2 border-2 border-${theme}-primary`}>
          <p className={`text-${theme}-text`}>Número de errores</p>
          <p className='text-center text-7xl font-bold'>{results['errors']}
            <span className={`text-2xl font-bold text-${theme}-primary`}>err.</span>
          </p>
        </section>
        <section className={`rounded-lg p-2 border-2 border-${theme}-primary`}>
          <p className={`text-${theme}-text`}>Tiempo</p>
          <p className='text-center text-7xl font-bold'>{results['time']}
            <span className={`text-2xl font-bold text-${theme}-primary`}>seg.</span>
          </p>
        </section>
        <section className={`rounded-lg p-2 border-2 border-${theme}-primary`}>
          <p className={`text-${theme}-text`}>Caracteres escritos</p>
          <p className='text-center text-7xl font-bold'>{results['totalChar']}
            <span className={`text-2xl font-bold text-${theme}-primary`}>car.</span>
          </p>
        </section>
      </div>
    </>
  )

}

export default Results;


Results.propTypes = {
  results: PropTypes.object,
  gameSettings: PropTypes.object,
};