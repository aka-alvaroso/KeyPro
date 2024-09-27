// src/components/GameSelector.jsx

import PropTypes from 'prop-types';
import { useState } from 'react';

const GameSelector = () => {

  const [mode, setMode] = useState('solo')
  const [type, setType] = useState('words')
  const [difficulty, setDifficulty] = useState('easy')
  const [selector, setSelector] = useState('solo')

  const [wordsSettings, setWordsSettings] = useState('50')
  const [timeSettings, setTimeSettings] = useState('60')
  const [codeSettings, setCodeSettings] = useState('python')

  const [showSettings, setShowSettings] = useState(false);


  window.addEventListener('keydown', () => {
    setShowSettings(false)
  })

  function handleClick (btn) {

    switch (btn) {

      case 'solo':
        setSelector('solo')
        setMode('solo')
        setShowSettings(true)

        break
      case 'challenge':
        setSelector('challenge')
        setMode('challenge')
        setShowSettings(true)
        break
      case 'versus':
        setSelector('versus')
        setMode('versus')
        setShowSettings(false)
        break

      case 'words':
        setSelector('words')
        setType('words')
        setShowSettings(false)
        break
      case 'code':
        setSelector('code')
        setType('code')
        setShowSettings(true)
        break
      case 'phrases':
        setSelector('phrases')
        setType('phrases')
        setShowSettings(false)
        break

      case 'easy':
        setSelector('easy')
        setDifficulty('easy')
        setShowSettings(false)
        break
      case 'medium':
        setSelector('medium')
        setDifficulty('medium')
        setShowSettings(false)
        break
      case 'hard':
        setSelector('hard')
        setDifficulty('hard')
        setShowSettings(false)
        break
    }

  }

  function handleClickMenu (btn) {

    switch (btn) {
      case '10':
        setWordsSettings('10')
        setShowSettings(false)
        break
      case '50':
        setWordsSettings('50')
        setShowSettings(false)
        break
      case '100':
        setWordsSettings('100')
        setShowSettings(false)
        break

      case '30':
        setTimeSettings('30')
        setShowSettings(false)
        break
      case '60':
        setTimeSettings('60')
        setShowSettings(false)
        break
      case '120':
        setTimeSettings('120')
        setShowSettings(false)
        break


      case 'python':
        setCodeSettings('python')
        setShowSettings(false)
        break
      case 'javascript':
        setCodeSettings('javascript')
        setShowSettings(false)
        break
      case 'c++':
        setCodeSettings('c++')
        setShowSettings(false)
        break
      case 'html':
        setCodeSettings('html')
        setShowSettings(false)
        break
      case 'java':
        setCodeSettings('java')
        setShowSettings(false)
        break
    }
  }


  return (
    <div className='w-4/6 flex flex-col items-center justify-between'>
      <div className='w-full flex justify-around items-center'>
        <div>
          <button onClick={() => handleClick('solo')} className={`${mode === 'solo' ? 'active' : ''}  text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>Solo</button>
          <button onClick={() => handleClick('challenge')} className={`${mode === 'challenge' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>Desafío</button>
          {/* <button onClick={() => handleClick('training')} className={`${mode === 'training' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>Entrenamiento</button> */}
          <button onClick={() => handleClick('versus')} className={`${mode === 'versus' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100 line-through`}>Competencia</button>
        </div>

        <span className='w-0.5 h-4/6 rounded-full bg-stone-700'></span>

        <div>
          <button onClick={() => handleClick('words')} className={`${type === 'words' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>Palabras</button>
          <button onClick={() => handleClick('code')} className={`${type === 'code' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>Código</button>
          <button onClick={() => handleClick('phrases')} className={`${type === 'phrases' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>Frases</button>
        </div>

        <span className='w-0.5 h-4/6 rounded-full bg-stone-700'></span>

        <div>
          <button onClick={() => handleClick('easy')} className={`${difficulty === 'easy' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>Fácil</button>
          <button onClick={() => handleClick('medium')} className={`${difficulty === 'medium' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>Medio</button>
          <button onClick={() => handleClick('hard')} className={`${difficulty === 'hard' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>Difícil</button>
        </div>
      </div>

      <div
        className={`min-w-48 bg-stone-900 text-center rounded-full transition-all duration-500 ease-in-out transform ${showSettings ? 'opacity-100 max-h-96 scale-100 overflow-visible' : 'opacity-0 max-h-0 scale-90 overflow-hidden'}`}
      >

        {
          selector === 'solo' ?
            <>
              <span className='text-xs text-stone-500'>
                Número de palabras
              </span>
              <br />
              <button onClick={() => handleClickMenu('10')} className={`${wordsSettings === '10' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>10</button>
              <button onClick={() => handleClickMenu('50')} className={`${wordsSettings === '50' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>50</button>
              <button onClick={() => handleClickMenu('100')} className={`${wordsSettings === '100' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>100</button>
            </> :
            selector === 'challenge' ?
              <>
                <span className='text-xs text-stone-500'>
                  Duración del test
                </span>
                <br />
                <button onClick={() => handleClickMenu('30')} className={`${timeSettings === '30' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>30s</button>
                <button onClick={() => handleClickMenu('60')} className={`${timeSettings === '60' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>60s</button>
                <button onClick={() => handleClickMenu('120')} className={`${timeSettings === '120' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>120s</button>
              </> :
              selector === 'code' ?
                <>
                  <span className='text-xs text-stone-500'>
                    Lenguaje de programación
                  </span>
                  <br />
                  <button onClick={() => handleClickMenu('python')} className={`${codeSettings === 'python' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>Python</button>
                  <button onClick={() => handleClickMenu('javascript')} className={`${codeSettings === 'javascript' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>JavaScript</button>
                  <button onClick={() => handleClickMenu('c++')} className={`${codeSettings === 'c++' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>C++</button>
                  <button onClick={() => handleClickMenu('html')} className={`${codeSettings === 'html' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>HTML</button>
                  <button onClick={() => handleClickMenu('java')} className={`${codeSettings === 'java' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-stone-100`}>Java</button>
                </> : <div className='h-16' />
        }

      </div>
    </div>
  )

}


export default GameSelector;

GameSelector.propTypes = {
  active: PropTypes.string,
  sound: PropTypes.bool,
  loggedIn: PropTypes.bool,
}