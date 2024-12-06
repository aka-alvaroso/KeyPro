// src/components/GameSelector.jsx

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';


const GameSelector = ({ setGameSettings }) => {
  const { theme } = useTheme();

  const [mode, setMode] = useState('practice')
  const [type, setType] = useState('text')
  const [difficulty, setDifficulty] = useState('easy')
  const [selector, setSelector] = useState('practice')

  const [wordsSettings, setWordsSettings] = useState('50')
  const [timeSettings, setTimeSettings] = useState('60')
  const [codeSettings, setCodeSettings] = useState('')
  const [langSettings, setLangSettings] = useState('es')

  const [showSettings, setShowSettings] = useState(false);


  window.addEventListener('keydown', () => {
    setShowSettings(false)
  })

  function handleClick (btn) {

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
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          difficulty: 'easy',
        }));
        break
      case 'medium':
        setSelector('medium')
        setDifficulty('medium')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          difficulty: 'medium',
        }));
        break
      case 'hard':
        setSelector('hard')
        setDifficulty('hard')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          difficulty: 'hard',
        }));
        break
    }
  }

  function handleClickMenu (btn) {

    switch (btn) {
      case '10':
        setWordsSettings('10')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          mode: 'practice',
          numWords: 10,
        }));
        break
      case '50':
        setWordsSettings('50')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          mode: 'practice',
          numWords: 50,
        }));
        break
      case '100':
        setWordsSettings('100')
        setShowSettings(false)
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          mode: 'practice',
          numWords: 100,
        }));
        break

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
      <div className='flex w-full items-center justify-between'>
        <div>
          <button
            onClick={() => handleClick('practice')}
            className={`${mode === 'practice' ? `text-${theme}-primary` : ''}  text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Práctica</button>
          <button
            onClick={() => handleClick('timed')}
            className={`${mode === 'timed' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Cronómetro</button>
          <button disabled
            onClick={() => handleClick('competitive')}
            className={`${mode === 'competitive' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary line-through`}>Competitivo</button>
        </div>

        <span className='w-0.5 h-4/6 rounded-full bg-stone-700'></span>

        <div>
          <button
            onClick={() => handleClick('text')}
            className={`${type === 'text' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Texto</button>
          <button
            onClick={() => handleClick('code')}
            className={`${type === 'code' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Código</button>
        </div>

        <span className='w-0.5 h-4/6 rounded-full bg-stone-700'></span>

        <div>
          <button
            onClick={() => handleClick('easy')}
            className={`${difficulty === 'easy' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Fácil</button>
          <button
            onClick={() => handleClick('medium')}
            className={`${difficulty === 'medium' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Medio</button>
          <button
            onClick={() => handleClick('hard')}
            className={`${difficulty === 'hard' ? `text-${theme}-primary` : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Difícil</button>
        </div>
      </div>

      <div
        className={`min-w-48 bg-${theme}-background text-center rounded-full transition-all duration-500 ease-in-out transform ${showSettings ? 'opacity-100 max-h-96 scale-100 overflow-visible' : 'opacity-0 max-h-0 scale-90 overflow-hidden'}`}
      >

        {
          selector === 'practice' ?
            <>
              <span className={`text-md text-${theme}-primary`}>
                Número de palabras
              </span>
              <br />
              <button
                onClick={() => handleClickMenu('10')}
                className={`${wordsSettings === '10' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>10</button>
              <button
                onClick={() => handleClickMenu('50')}
                className={`${wordsSettings === '50' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>50</button>
              <button
                onClick={() => handleClickMenu('100')}
                className={`${wordsSettings === '100' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>100</button>
            </> :
            selector === 'timed' ?
              <>
                <span className={`text-md text-${theme}-primary`}>
                  Duración del test
                </span>
                <br />
                <button
                  onClick={() => handleClickMenu('30')}
                  className={`${timeSettings === '30' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>30s</button>
                <button
                  onClick={() => handleClickMenu('60')}
                  className={`${timeSettings === '60' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>60s</button>
                <button
                  onClick={() => handleClickMenu('120')}
                  className={`${timeSettings === '120' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>120s</button>
              </> :
              selector === 'text' ?
                <>
                  <span className={`text-md text-${theme}-primary`}>
                    Lenguaje
                  </span>
                  <br />
                  <button
                    onClick={() => handleClickMenu('es')}
                    className={`${langSettings === 'es' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Español</button>
                  <button
                    onClick={() => handleClickMenu('en')}
                    className={`${langSettings === 'en' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>English</button>
                </> :
                selector === 'code' ?
                  <>
                    <span className={`text-md text-${theme}-primary`}>
                      Lenguaje de programación
                    </span>
                    <br />
                    <button
                      onClick={() => handleClickMenu('python')}
                      className={`${codeSettings === 'python' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>Python</button>
                    <button
                      onClick={() => handleClickMenu('javascript')}
                      className={`${codeSettings === 'javascript' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>JavaScript</button>
                    <button
                      onClick={() => handleClickMenu('c++')}
                      className={`${codeSettings === 'c++' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>C++</button>
                    <button
                      onClick={() => handleClickMenu('html')}
                      className={`${codeSettings === 'html' ? 'active' : ''} text-sm m-2 p-1 rounded-full transition hover:text-${theme}-primary`}>HTML</button>
                    <button
                      onClick={() => handleClickMenu('java')}
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