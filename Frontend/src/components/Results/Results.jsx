import PropTypes from 'prop-types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faCheck, faWarning } from '@fortawesome/free-solid-svg-icons';
import StatCard from '../ui/StatCard';

const Results = ({ results, areResultsSaved }) => {
  const [velocityType, setVelocityType] = useState('ppm');

  if (!results.isReady) return null;

  return (
    <>
      {areResultsSaved.user && areResultsSaved.test ? (
        <div className="my-4 flex items-center gap-3 py-2 px-6 rounded-xl border-2 border-green-500/50 bg-green-50 text-green-700 text-sm">
          <FontAwesomeIcon icon={faCheck} />
          <span>Resultados guardados correctamente</span>
          <FontAwesomeIcon icon={faCheck} />
        </div>
      ) : (
        <div className="my-4 flex items-center gap-3 py-2 px-6 rounded-xl border-2 border-kp-accent/50 bg-kp-accent/10 text-kp-text text-sm">
          <FontAwesomeIcon icon={faWarning} className="text-kp-accent" />
          <span>Inicia sesión para guardar los resultados</span>
          <FontAwesomeIcon icon={faWarning} className="text-kp-accent" />
        </div>
      )}

      <p className="font-medium text-2xl text-left w-4/6 text-kp-text">Resultados</p>
      <div className="mt-4 w-4/6 grid grid-cols-3 gap-3">
        <StatCard label="Puntuación" value={results.score} unit="pts." />

        <StatCard label="Velocidad" className="relative">
          <button
            onClick={() => setVelocityType(velocityType === 'ppm' ? 'cpm' : 'ppm')}
            className="absolute top-3 right-3 text-kp-muted hover:text-kp-accent transition-colors"
          >
            <FontAwesomeIcon icon={faArrowRightArrowLeft} className="text-xs" />
          </button>
          <p className="text-center text-6xl font-medium text-kp-text">
            {velocityType === 'ppm' ? results.ppm : results.cpm}
            <span className="text-xl font-medium text-kp-accent ml-1">{velocityType.toUpperCase()}</span>
          </p>
        </StatCard>

        <StatCard label="Precisión" value={results.accurate} unit="%" />
        <StatCard label="Errores" value={results.errors} unit="err." />
        <StatCard label="Tiempo" value={results.time} unit="seg." />
        <StatCard label="Caracteres escritos" value={results.totalChar} unit="car." />
      </div>
    </>
  );
};

Results.propTypes = {
  results: PropTypes.object,
  areResultsSaved: PropTypes.object,
};

export default Results;
