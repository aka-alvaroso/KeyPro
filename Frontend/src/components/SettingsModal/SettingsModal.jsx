import PropTypes from 'prop-types';

const SettingsModal = ({ isOpen, setIsOpen }) => {
  if (isOpen) {
    let title = 'Selecciona un tema';

    return (
      <div className='absolute top-0 left-0 w-screen h-screen z-100 flex items-center justify-center'>
        {/* Fondo difuminado */}
        {/* <div className='absolute top-0 left-0 w-full h-full bg-stone-900 opacity-50 z-90'></div> */}

        {/* Modal */}
        <div className='modal w-1/3 h-4/6 bg-stone-900 rounded-3xl text-stone-500 opacity-100 z-110 flex flex-col items-center justify-center'>
          {/* Barra superior */}
          <div className='w-11/12 p-2 flex items-center justify-between'>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <button className='text-xl' onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          {/* Contenido del modal */}
          <div className='w-11/12 flex flex-col items-center justify-center'>
            {/* Tema 1 - Por defecto */}
            <div className='flex items-center justify-center w-full h-1/2 bg-stone-800 rounded-xl'>
              <h2 className='text-xl font-bold'>Por defecto</h2>
              <div className='colors'>

              </div>
              <button className='w-1/2 h-full bg-stone-700 rounded-xl text-stone-500 hover:bg-stone-600 transition'>
                X
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
  return null;
};

SettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default SettingsModal;
