import PropTypes from 'prop-types';

const Results = ({ results }) => {

  return (
    <>
      <p className={`${results['isReady'] ? 'block' : 'hidden'} text-3xl text-left w-4/6`}>Resultados</p>
      <div className={`${results['isReady'] ? 'block' : 'hidden'} w-4/6 flex flex-wrap items-center justify-evenly h-96 bg-stone-900 rounded-lg p-2`}>
        <section className='w-3/12 h-2/6 bg-stone-800 rounded-lg p-2'>
          <p className=''>Puntuación</p>
          <p className='text-center text-7xl font-bold'>{results['score']}<span className='text-2xl font-bold text-orange-600'>pts.</span></p>
        </section>
        <section className='w-3/12 h-2/6 bg-stone-800 rounded-lg p-2'>
          <p className=''>Velocidad</p>
          <p className='text-center text-7xl font-bold'>{results['velocity']}<span className='text-2xl font-bold text-orange-600'>PPM</span></p>
        </section>
        <section className='w-3/12 h-2/6 bg-stone-800 rounded-lg p-2'>
          <p className=''>Precisión</p>
          <p className='text-center text-7xl font-bold'>{results['accurate']}<span className='text-2xl font-bold text-orange-600'>%</span></p>
        </section>
        <section className='w-4/12 h-2/6 bg-stone-800 rounded-lg p-2'>
          <p className=''>Número de errores</p>
          <p className='text-center text-7xl font-bold'>{results['errors']}<span className='text-2xl font-bold text-orange-600'>err.</span></p>
        </section>
        <section className='w-4/12 h-2/6 bg-stone-800 rounded-lg p-2'>
          <p className=''>Total de caracteres</p>
          <p className='text-center text-7xl font-bold'>{results['totalChar']}<span className='text-2xl font-bold text-orange-600'>car.</span></p>
        </section>
      </div>
    </>
  )

}

export default Results;


Results.propTypes = {
  results: PropTypes.object,
};