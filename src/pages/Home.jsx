// src/pages/Home.jsx

import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar'
import GameSelector from '../components/GameSelector'
import Test from '../components/Test'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  return (
    <div className="w-screen h-screen bg-stone-800 text-stone-400 flex flex-col items-center">

      {/* Navbar */}
      <Navbar />

      <main className="w-full max-w-screen-2xl h-4/6 p-4 flex flex-col items-center justify-center">

        {/* Game Selector */}
        <GameSelector />

        {/* Test */}
        <Test text={'El sol brillaba con fuerza mientras las aves volaban alto en el cielo. Los árboles se mecían suavemente con el viento, y las flores llenaban el aire con su aroma. La tranquilidad del paisaje invitaba a descansar, a reflexionar y a disfrutar del momento presente sin preocupaciones.'} />


        <div className='w-4/6 h-2 bg-stone-700 rounded-full '>

        </div>

        <p className='mt-4 text-stone-600'><FontAwesomeIcon icon={faArrowRotateRight} /> Pulsa <span className='p-1 bg-stone-900 rounded-md text-stone-500'>Escape</span> para reiniciar</p>

      </main>


      <footer className="w-full max-w-screen-2xl h-1/6 p-4 flex items-end justify-center text-stone-700">
        <Link to="/about" className='mx-1 transition hover:text-stone-500'>Acerca de TypeMaster</Link>
        <p>- © Todos los derechos reservados. 2024 </p>
      </footer>
    </div>
  );
};

export default Home;
