import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const ThemeModal = ({ isOpen, setIsOpen }) => {
  const { theme, setTheme } = useTheme();

  if (isOpen) {
    return (

      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
        className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center" >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`relative w-1/3 h-2/3 bg-${theme}-background bg-opacity-95 rounded-md bg-center border-2 border-${theme}-primary overflow-y-auto`}>
          <div className="flex justify-between items-center p-8">
            <h2 className={`text-3xl font-bold text-${theme}-primary`}>Selecciona un tema</h2>
            <button className={`font-bold bg-${theme}-primary text-${theme}-text rounded-md py-1 px-2 transition hover:bg-${theme}-secondary hover:text-${theme}-primary`} onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>

          <div className="p-8 flex flex-col items-center justify-center gap-4">

            <div
              onClick={() => setTheme('darkOrange')}
              className={`w-full h-1/2 flex items-center justify-between py-4 px-8 bg-${theme}-background border-2 border-${theme}-primary rounded-md hover:bg-${theme}-background hover:brightness-125 hover:cursor-pointer transition `}>
              <div
                className='flex flex-col justify-center'>
                <h2 className='text-xl mb-1'>
                  Oscuro - Naranja
                </h2>
                <div className="flex gap-4">
                  <div className={`bg-darkOrange-background rounded-md w-6 h-6 border border-darkOrange-primary`}></div>
                  <div className={`bg-darkOrange-text rounded-md w-6 h-6 border border-darkOrange-primary`}></div>
                  <div className={`bg-darkOrange-primary rounded-md w-6 h-6`}></div>
                  <div className={`bg-darkOrange-secondary rounded-md w-6 h-6`}></div>
                </div>
              </div>
              {theme === 'darkOrange'
                ? <div className='bg-green-900 rounded-md border border-green-600 text-green-600 py-0.5 px-1 text-xs'>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                : ''
              }
            </div>

            <div
              onClick={() => setTheme('lightOrange')}
              className={`w-full h-1/2 flex items-center justify-between py-4 px-8 bg-${theme}-background border-2 border-${theme}-primary rounded-md hover:bg-${theme}-background hover:brightness-125 hover:cursor-pointer transition `}>
              <div
                className='flex flex-col justify-center'>
                <h2 className='text-xl mb-1'>
                  Claro - Naranja
                </h2>
                <div className="flex gap-4">
                  <div className={`bg-lightOrange-background rounded-md w-6 h-6 border border-darkOrange-primary`}></div>
                  <div className={`bg-lightOrange-text rounded-md w-6 h-6 border border-lightOrange-primary`}></div>
                  <div className={`bg-lightOrange-primary rounded-md w-6 h-6`}></div>
                  <div className={`bg-lightOrange-secondary rounded-md w-6 h-6`}></div>
                </div>
              </div>
              {theme === 'lightOrange'
                ? <div className='bg-green-900 rounded-md border border-green-600 text-green-600 py-0.5 px-1 text-xs'>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                : ''
              }
            </div>

            <div
              onClick={() => setTheme('darkGreen')}
              className={`w-full h-1/2 flex items-center justify-between py-4 px-8 bg-${theme}-background border-2 border-${theme}-primary rounded-md hover:bg-${theme}-background hover:brightness-125 hover:cursor-pointer transition `}>
              <div
                className='flex flex-col justify-center'>
                <h2 className='text-xl mb-1'>
                  Oscuro - Verde
                </h2>
                <div className="flex gap-4">
                  <div className={`bg-darkGreen-background rounded-md w-6 h-6 border border-darkGreen-primary`}></div>
                  <div className={`bg-darkGreen-text rounded-md w-6 h-6 border border-darkGreen-primary`}></div>
                  <div className={`bg-darkGreen-primary rounded-md w-6 h-6`}></div>
                  <div className={`bg-darkGreen-secondary rounded-md w-6 h-6`}></div>
                </div>
              </div>
              {theme === 'darkGreen'
                ? <div className='bg-green-900 rounded-md border border-green-600 text-green-600 py-0.5 px-1 text-xs'>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                : ''
              }
            </div>

            <div
              onClick={() => setTheme('lightGreen')}
              className={`w-full h-1/2 flex items-center justify-between py-4 px-8 bg-${theme}-background border-2 border-${theme}-primary rounded-md hover:bg-${theme}-background hover:brightness-125 hover:cursor-pointer transition `}>
              <div
                className='flex flex-col justify-center'>
                <h2 className='text-xl mb-1'>
                  Claro - Verde
                </h2>
                <div className="flex gap-4">
                  <div className={`bg-lightGreen-background rounded-md w-6 h-6 border border-darkGreen-primary`}></div>
                  <div className={`bg-lightGreen-text rounded-md w-6 h-6 border border-lightGreen-primary`}></div>
                  <div className={`bg-lightGreen-primary rounded-md w-6 h-6`}></div>
                  <div className={`bg-lightGreen-secondary rounded-md w-6 h-6`}></div>
                </div>
              </div>
              {theme === 'lightGreen'
                ? <div className='bg-green-900 rounded-md border border-green-600 text-green-600 py-0.5 px-1 text-xs'>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                : ''
              }
            </div>

            <div
              onClick={() => setTheme('darkBlue')}
              className={`w-full h-1/2 flex items-center justify-between py-4 px-8 bg-${theme}-background border-2 border-${theme}-primary rounded-md hover:bg-${theme}-background hover:brightness-125 hover:cursor-pointer transition `}>
              <div
                className='flex flex-col justify-center'>
                <h2 className='text-xl mb-1'>
                  Oscuro - Azul
                </h2>
                <div className="flex gap-4">
                  <div className={`bg-darkBlue-background rounded-md w-6 h-6 border border-darkBlue-primary`}></div>
                  <div className={`bg-darkBlue-text rounded-md w-6 h-6 border border-darkBlue-primary`}></div>
                  <div className={`bg-darkBlue-primary rounded-md w-6 h-6`}></div>
                  <div className={`bg-darkBlue-secondary rounded-md w-6 h-6`}></div>
                </div>
              </div>
              {theme === 'darkBlue'
                ? <div className='bg-green-900 rounded-md border border-green-600 text-green-600 py-0.5 px-1 text-xs'>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                : ''
              }
            </div>

            <div
              onClick={() => setTheme('lightBlue')}
              className={`w-full h-1/2 flex items-center justify-between py-4 px-8 bg-${theme}-background border-2 border-${theme}-primary rounded-md hover:bg-${theme}-background hover:brightness-125 hover:cursor-pointer transition `}>
              <div
                className='flex flex-col justify-center'>
                <h2 className='text-xl mb-1'>
                  Claro - Azul
                </h2>
                <div className="flex gap-4">
                  <div className={`bg-lightBlue-background rounded-md w-6 h-6 border border-darkBlue-primary`}></div>
                  <div className={`bg-lightBlue-text rounded-md w-6 h-6 border border-lightBlue-primary`}></div>
                  <div className={`bg-lightBlue-primary rounded-md w-6 h-6`}></div>
                  <div className={`bg-lightBlue-secondary rounded-md w-6 h-6`}></div>
                </div>
              </div>
              {theme === 'lightBlue'
                ? <div className='bg-green-900 rounded-md border border-green-600 text-green-600 py-0.5 px-1 text-xs'>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                : ''
              }
            </div>







          </div>
        </div>
      </div >

    );
  }
  return null;
};

ThemeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ThemeModal;
