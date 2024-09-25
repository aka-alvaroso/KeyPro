// Home.js
// import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard } from '@fortawesome/free-regular-svg-icons'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { faBrush } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  return (
    <div className="w-screen h-screen bg-stone-800 text-stone-400 flex flex-col items-center">
      <header className="w-full max-w-screen-2xl h-1/6  p-4 flex items-start justify-between">
        <div className="flex items-center">
          <img src="logo.png" className="w-14" /> <h2 className="font-bold text-3xl mx-4">TypeMaster</h2>
          <Link to="/" className='active text-xl m-2 transition hover:text-orange-600' ><FontAwesomeIcon icon={faKeyboard} /></Link>
          <Link to="/rankings" className='text-xl m-2 transition hover:text-orange-600'><FontAwesomeIcon icon={faCrown} /></Link>
          <button className='text-xl m-2 transition hover:text-orange-600'><FontAwesomeIcon icon={faBrush} /></button>
          <button className='text-xl m-2 transition hover:text-orange-600'><FontAwesomeIcon icon={faGear} /></button>
        </div>
        <div className="flex items-center">
          <button className='text-sm m-1 hover:text-orange-600'><FontAwesomeIcon icon={faVolumeHigh} /></button>
          <button className='text-md mx-1 p-2 rounded-lg transition hover:text-orange-600'>Iniciar Sesión</button>
          <button className='text-md mx-1 p-2 rounded-lg transition hover:text-orange-600'>Registrarme</button>
        </div>
      </header>


      <main className="w-full max-w-screen-2xl h-4/6 p-4 flex flex-col items-center justify-center">
        <div className='w-4/6 flex justify-around items-center'>
          <div>
            <button className='active text-sm m-2 p-1 rounded-full transition hover:text-orange-600'>Solo</button>
            {/* <button className='text-sm m-2 p-1 rounded-full transition hover:text-orange-600'>Competencia</button> */}
            <button className='text-sm m-2 p-1 rounded-full transition hover:text-orange-600'>Desafío</button>
            <button className='text-sm m-2 p-1 rounded-full transition hover:text-orange-600'>Entrenamiento</button>
          </div>

          <span className='w-0.5 h-4/6 rounded-full bg-stone-700'></span>

          <div>
            <button className='active text-sm m-2 p-1 rounded-full transition hover:text-orange-600'>Palabras</button>
            <button className='text-sm m-2 p-1 rounded-full transition hover:text-orange-600'>Código</button>
            <button className='text-sm m-2 p-1 rounded-full transition hover:text-orange-600'>Frases</button>
          </div>

          <span className='w-0.5 h-4/6 rounded-full bg-stone-700'></span>

          <div>
            <button className='active text-sm m-2 p-1 rounded-full transition hover:text-orange-600'>Fácil</button>
            <button className='text-sm m-2 p-1 rounded-full transition hover:text-orange-600'>Medio</button>
            <button className='text-sm m-2 p-1 rounded-full transition hover:text-orange-600'>Difícil</button>
          </div>

        </div>
        <div className='w-4/6 my-8 text-stone-600 text-3xl'>
          El sol brillaba con fuerza mientras las aves volaban alto en el cielo. Los árboles se mecían suavemente con el viento, y las flores llenaban el aire con su aroma. La tranquilidad del paisaje invitaba a descansar, a reflexionar y a disfrutar del momento presente sin preocupaciones.
        </div>
        <div className='w-4/6 h-2 bg-stone-700 rounded-full '>

        </div>

      </main>


      <footer className="w-full max-w-screen-2xl h-1/6 p-4 flex items-end justify-center text-stone-700">
        <Link to="/about" className='mx-1 transition hover:text-stone-500'>Acerca de TypeMaster</Link>
        <p>- © Todos los derechos reservados. 2024 </p>
      </footer>
    </div>
  );
};

export default Home;
