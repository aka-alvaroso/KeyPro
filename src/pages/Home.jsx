// src/pages/Home.jsx

import { Link } from 'react-router-dom';
import { useState } from 'react';

import Navbar from '../components/Navbar'
import GameSelector from '../components/GameSelector'
import Test from '../components/Test/Test'
import Results from '../components/Results/Results'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'

const Home = () => {

  const [results, setResults] = useState({
    isReady: false,
    score: 0,
    velocity: 0,
    accurate: 0,
    errors: 0,
    totalChar: 0
  })

  return (
    <div className="w-screen h-screen bg-stone-800 text-stone-400 flex flex-col items-center">

      {/* Navbar */}
      <Navbar />

      <main className="w-full max-w-screen-2xl h-4/6 p-4 flex flex-col items-center justify-center">

        {/* Game Selector */}

        <div className={`${results['isReady'] ? 'hidden' : 'block'} w-4/6 flex flex-col items-center justify-between`}>
          <GameSelector />
        </div>


        {/* Test */}
        <div className={`flex-wrap w-4/6 my-8 text-stone-600 text-3xl ${results['isReady'] ? 'hidden' : 'block'}`}>
          <Test setTestResults={setResults} text={'El sol brillaba con fuerza mientras las aves volaban alto en el cielo. Los árboles se mecían suavemente con el viento, y las flores llenaban el aire con su aroma. La tranquilidad del paisaje invitaba a descansar, a reflexionar y a disfrutar del momento presente sin preocupaciones.'} />
        </div>

        {/* Results */}
        <Results results={results} />

        {/* TimeBar */}
        <div className={`${results['isReady'] ? 'hidden' : 'block'} w-4/6 h-2 bg-stone-700 rounded-full`}>

        </div>

        {/* Restart text */}
        <p className='mt-4 text-stone-600'><FontAwesomeIcon className='transition hover:-rotate-180' icon={faArrowRotateRight} /> Presiona <span className='p-1 bg-stone-900 rounded-md text-stone-500'>Escape</span> para reiniciar</p>

      </main >


      <footer className="w-full max-w-screen-2xl h-1/6 p-4 flex items-end justify-center text-stone-700">
        <Link to="/about" className='mx-1 transition hover:text-stone-500'>Acerca de TypeMaster</Link>
        <p>- © Todos los derechos reservados. 2024 </p>
      </footer>
    </div >
  );
};

export default Home;
