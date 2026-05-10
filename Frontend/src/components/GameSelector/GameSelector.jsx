// src/components/GameSelector.jsx

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';


const GameSelector = ({ setGameSettings }) => {
  const { theme } = useTheme();

  const [mode, setMode] = useState('practice')
  const [type, setType] = useState('text')
  const [difficulty, setDifficulty] = useState('easy')
  const [length, setLength] = useState('medium')
  const [selector, setSelector] = useState('practice')

  const [timeSettings, setTimeSettings] = useState('60')
  const [codeSettings, setCodeSettings] = useState('')
  const [langSettings, setLangSettings] = useState('es')

  const [showSettings, setShowSettings] = useState(false);


  window.addEventListener('keydown', () => {
    setShowSettings(false)
  })

  function handleClick (btn, e) {
    e.currentTarget.blur();

    switch (btn) {

      case 'practice':
        setSelector('practice')
        setMode('practice')
        setShowSettings(true)
        break
      case 'timed':
        setSelector('timed')
        setMode('timed')
        setShowSettings(true)
        break
      case 'competitive':
        setSelector('competitive')
        setMode('competitive')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          mode: 'competitive',
        }));
        break

      case 'text':
        setSelector('text')
        setType('text')
        setShowSettings(false)
        setShowSettings(true)
        break
      case 'code':
        setSelector('code')
        setType('code')
        setShowSettings(true)
        break

      case 'easy':
        setSelector('easy')
        setDifficulty('easy')
        setShowSettings(false)
        setGameSettings(p => ({ ...p, difficulty: 'easy' }));
        break
      case 'medium':
        setSelector('medium')
        setDifficulty('medium')
        setShowSettings(false)
        setGameSettings(p => ({ ...p, difficulty: 'medium' }));
        break
      case 'hard':
        setSelector('hard')
        setDifficulty('hard')
        setShowSettings(false)
        setGameSettings(p => ({ ...p, difficulty: 'hard' }));
        break

      case 'short':
        setLength('short')
        setShowSettings(false)
        setGameSettings(p => ({ ...p, length: 'short' }));
        break
      case 'long':
        setLength('long')
        setShowSettings(false)
        setGameSettings(p => ({ ...p, length: 'long' }));
        break
      case 'medium-length':
        setLength('medium')
        setShowSettings(false)
        setGameSettings(p => ({ ...p, length: 'medium' }));
        break
    }
  }

  function handleClickMenu (btn, e) {
    e.currentTarget.blur();

    switch (btn) {
      case '30':
        setTimeSettings('30')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          mode: 'timed',
          time: 30,
        }));
        break
      case '60':
        setTimeSettings('60')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          mode: 'timed',
          time: 60,
        }));
        break
      case '120':
        setTimeSettings('120')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          mode: 'timed',
          time: 120,
        }));
        break

      case 'es':
        setLangSettings('es')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          type: 'text',
          language: 'es',
        }));
        break
      case 'en':
        setLangSettings('en')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          type: 'text',
          language: 'en',
        }));
        break


      case 'python':
        setCodeSettings('python')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          type: 'code',
          language: 'python',
        }));
        break
      case 'javascript':
        setCodeSettings('javascript')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          type: 'code',
          language: 'javascript',
        }));
        break
      case 'c++':
        setCodeSettings('c++')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          type: 'code',
          language: 'c++',
        }));
        break
      case 'html':
        setCodeSettings('html')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          type: 'code',
          language: 'html',
        }));
        break
      case 'java':
        setCodeSettings('java')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          type: 'code',
          language: 'java',
        }));
        break
    }
  }


  return (
    <>
      <div className='flex flex-col w-full gap-1'>
        {/* Fila 1: Modo y Tipo */}
        <div className='flex w-full items-center justify-center gap-2'>
          <div>
            <button
              onClick={(e) => handleClick('practice', e)}
              className={`${mode === 'practice' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Práctica</button>
            <button
              onClick={(e) => handleClick('timed', e)}
              className={`${mode === 'timed' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Cronómetro</button>
            <button disabled
              onClick={(e) => handleClick('competitive', e)}
              className={`${mode === 'competitive' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary line-through`}>Competitivo</button>
          </div>

          <span className='w-0.5 h-5 rounded-full bg-stone-700'></span>

          <div>
            <button
              onClick={(e) => handleClick('text', e)}
              className={`${type === 'text' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Texto</button>
            <button
              onClick={(e) => handleClick('code', e)}
              className={`${type === 'code' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Código</button>
          </div>
        </div>

        {/* Fila 2: Dificultad y Longitud */}
        <div className='flex w-full items-center justify-center gap-2'>
          <div>
            <button
              onClick={(e) => handleClick('easy', e)}
              className={`${difficulty === 'easy' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Fácil</button>
            <button
              onClick={(e) => handleClick('medium', e)}
              className={`${difficulty === 'medium' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Medio</button>
            <button
              onClick={(e) => handleClick('hard', e)}
              className={`${difficulty === 'hard' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Difícil</button>
          </div>

          <span className='w-0.5 h-5 rounded-full bg-stone-700'></span>

          <div>
            <button
              onClick={(e) => handleClick('short', e)}
              className={`${length === 'short' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Corto</button>
            <button
              onClick={(e) => handleClick('medium-length', e)}
              className={`${length === 'medium' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Medio</button>
            <button
              onClick={(e) => handleClick('long', e)}
              className={`${length === 'long' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Largo</button>
          </div>
        </div>
      </div>

      <div
        className={`min-w-48 bg-${theme}-background text-center rounded-full transition-all duration-500 ease-in-out transform ${showSettings ? 'opacity-100 max-h-96 scale-100 overflow-visible' : 'opacity-0 max-h-0 scale-90 overflow-hidden'}`}
      >

        {
          selector === 'practice' ? <div className='h-4' /> :
            selector === 'timed' ?
              <>
                <span className={`text-md text-${theme}-primary`}>
                  Duración del test
                </span>
                <br />
                <button
                  onClick={(e) => handleClickMenu('30', e)}
                  className={`${timeSettings === '30' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>30s</button>
                <button
                  onClick={(e) => handleClickMenu('60', e)}
                  className={`${timeSettings === '60' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>60s</button>
                <button
                  onClick={(e) => handleClickMenu('120', e)}
                  className={`${timeSettings === '120' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>120s</button>
              </> :
              selector === 'text' ?
                <>
                  <span className={`text-md text-${theme}-primary`}>
                    Lenguaje
                  </span>
                  <br />
                  <button
                    onClick={(e) => handleClickMenu('es', e)}
                    className={`${langSettings === 'es' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Español</button>
                  <button
                    onClick={(e) => handleClickMenu('en', e)}
                    className={`${langSettings === 'en' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>English</button>
                </> :
                selector === 'code' ?
                  <>
                    <span className={`text-md text-${theme}-primary`}>
                      Lenguaje de programación
                    </span>
                    <br />
                    <button
                      onClick={(e) => handleClickMenu('python', e)}
                      className={`${codeSettings === 'python' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Python</button>
                    <button
                      onClick={(e) => handleClickMenu('javascript', e)}
                      className={`${codeSettings === 'javascript' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>JavaScript</button>
                    <button
                      onClick={(e) => handleClickMenu('c++', e)}
                      className={`${codeSettings === 'c++' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>C++</button>
                    <button
                      onClick={(e) => handleClickMenu('html', e)}
                      className={`${codeSettings === 'html' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>HTML</button>
                    <button
                      onClick={(e) => handleClickMenu('java', e)}
                      className={`${codeSettings === 'java' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Java</button>
                  </> : <div className='h-16' />
        }

      </div>
    </>
  )

}


export default GameSelector;

GameSelector.propTypes = {
  gameSettings: PropTypes.object,
  setGameSettings: PropTypes.func,
}