import PropTypes from 'prop-types';
import { useState } from 'react';

const TAB_BTN = (active) =>
  `text-sm px-2 py-1 rounded transition-colors duration-150 ${
    active ? 'text-kp-accent' : 'text-kp-muted hover:text-kp-text'
  }`;

const GameSelector = ({ setGameSettings }) => {
  const [mode, setMode] = useState('practice');
  const [type, setType] = useState('text');
  const [difficulty, setDifficulty] = useState('easy');
  const [length, setLength] = useState('medium');
  const [selector, setSelector] = useState('practice');

  const [timeSettings, setTimeSettings] = useState('60');
  const [codeSettings, setCodeSettings] = useState('');
  const [langSettings, setLangSettings] = useState('es');

  const [showSettings, setShowSettings] = useState(false);

  window.addEventListener('keydown', () => setShowSettings(false));

  function handleClick(btn, e) {
    e.currentTarget.blur();
    switch (btn) {
      case 'practice':
        setSelector('practice'); setMode('practice'); setShowSettings(true); break;
      case 'timed':
        setSelector('timed'); setMode('timed'); setShowSettings(true); break;
      case 'competitive':
        setSelector('competitive'); setMode('competitive'); setShowSettings(false);
        setGameSettings(p => ({ ...p, mode: 'competitive' })); break;
      case 'text':
        setSelector('text'); setType('text'); setShowSettings(true); break;
      case 'code':
        setSelector('code'); setType('code'); setShowSettings(true); break;
      case 'easy':
        setSelector('easy'); setDifficulty('easy'); setShowSettings(false);
        setGameSettings(p => ({ ...p, difficulty: 'easy' })); break;
      case 'medium':
        setSelector('medium'); setDifficulty('medium'); setShowSettings(false);
        setGameSettings(p => ({ ...p, difficulty: 'medium' })); break;
      case 'hard':
        setSelector('hard'); setDifficulty('hard'); setShowSettings(false);
        setGameSettings(p => ({ ...p, difficulty: 'hard' })); break;
      case 'short':
        setLength('short'); setShowSettings(false);
        setGameSettings(p => ({ ...p, length: 'short' })); break;
      case 'medium-length':
        setLength('medium'); setShowSettings(false);
        setGameSettings(p => ({ ...p, length: 'medium' })); break;
      case 'long':
        setLength('long'); setShowSettings(false);
        setGameSettings(p => ({ ...p, length: 'long' })); break;
    }
  }

  function handleClickMenu(btn, e) {
    e.currentTarget.blur();
    switch (btn) {
      case '30':
        setTimeSettings('30'); setShowSettings(false);
        setGameSettings(p => ({ ...p, mode: 'timed', time: 30 })); break;
      case '60':
        setTimeSettings('60'); setShowSettings(false);
        setGameSettings(p => ({ ...p, mode: 'timed', time: 60 })); break;
      case '120':
        setTimeSettings('120'); setShowSettings(false);
        setGameSettings(p => ({ ...p, mode: 'timed', time: 120 })); break;
      case 'es':
        setLangSettings('es'); setShowSettings(false);
        setGameSettings(p => ({ ...p, type: 'text', language: 'es' })); break;
      case 'en':
        setLangSettings('en'); setShowSettings(false);
        setGameSettings(p => ({ ...p, type: 'text', language: 'en' })); break;
      case 'python':
        setCodeSettings('python'); setShowSettings(false);
        setGameSettings(p => ({ ...p, type: 'code', language: 'python' })); break;
      case 'javascript':
        setCodeSettings('javascript'); setShowSettings(false);
        setGameSettings(p => ({ ...p, type: 'code', language: 'javascript' })); break;
      case 'c++':
        setCodeSettings('c++'); setShowSettings(false);
        setGameSettings(p => ({ ...p, type: 'code', language: 'c++' })); break;
      case 'html':
        setCodeSettings('html'); setShowSettings(false);
        setGameSettings(p => ({ ...p, type: 'code', language: 'html' })); break;
      case 'java':
        setCodeSettings('java'); setShowSettings(false);
        setGameSettings(p => ({ ...p, type: 'code', language: 'java' })); break;
    }
  }

  return (
    <>
      <div className="flex flex-col w-full gap-1">
        <div className="flex w-full items-center justify-center gap-3">
          <div className="flex">
            <button onClick={(e) => handleClick('practice', e)} className={TAB_BTN(mode === 'practice')}>Práctica</button>
            <button onClick={(e) => handleClick('timed', e)} className={TAB_BTN(mode === 'timed')}>Cronómetro</button>
            <button disabled onClick={(e) => handleClick('competitive', e)} className={`${TAB_BTN(mode === 'competitive')} line-through opacity-40`}>Competitivo</button>
          </div>
          <span className="w-px h-4 bg-kp-border" />
          <div className="flex">
            <button onClick={(e) => handleClick('text', e)} className={TAB_BTN(type === 'text')}>Texto</button>
            <button onClick={(e) => handleClick('code', e)} className={TAB_BTN(type === 'code')}>Código</button>
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-3">
          <div className="flex">
            <button onClick={(e) => handleClick('easy', e)} className={TAB_BTN(difficulty === 'easy')}>Fácil</button>
            <button onClick={(e) => handleClick('medium', e)} className={TAB_BTN(difficulty === 'medium')}>Medio</button>
            <button onClick={(e) => handleClick('hard', e)} className={TAB_BTN(difficulty === 'hard')}>Difícil</button>
          </div>
          <span className="w-px h-4 bg-kp-border" />
          <div className="flex">
            <button onClick={(e) => handleClick('short', e)} className={TAB_BTN(length === 'short')}>Corto</button>
            <button onClick={(e) => handleClick('medium-length', e)} className={TAB_BTN(length === 'medium')}>Medio</button>
            <button onClick={(e) => handleClick('long', e)} className={TAB_BTN(length === 'long')}>Largo</button>
          </div>
        </div>
      </div>

      <div className={`mt-2 text-center transition-all duration-300 ease-in-out ${showSettings ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        {selector === 'timed' && (
          <>
            <span className="text-xs text-kp-muted">Duración</span>
            <br />
            {['30', '60', '120'].map(t => (
              <button key={t} onClick={(e) => handleClickMenu(t, e)} className={TAB_BTN(timeSettings === t)}>{t}s</button>
            ))}
          </>
        )}
        {selector === 'text' && (
          <>
            <span className="text-xs text-kp-muted">Idioma</span>
            <br />
            {[['es', 'Español'], ['en', 'English']].map(([k, v]) => (
              <button key={k} onClick={(e) => handleClickMenu(k, e)} className={TAB_BTN(langSettings === k)}>{v}</button>
            ))}
          </>
        )}
        {selector === 'code' && (
          <>
            <span className="text-xs text-kp-muted">Lenguaje</span>
            <br />
            {['python', 'javascript', 'c++', 'html', 'java'].map(lang => (
              <button key={lang} onClick={(e) => handleClickMenu(lang, e)} className={TAB_BTN(codeSettings === lang)}>{lang}</button>
            ))}
          </>
        )}
      </div>
    </>
  );
};

GameSelector.propTypes = {
  gameSettings: PropTypes.object,
  setGameSettings: PropTypes.func,
};

export default GameSelector;
