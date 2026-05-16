import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

export const SettingsProvider = ({ children }) => {
  const [cursorStyle,   setCursorStyleRaw]   = useState(() => load('kp-cursor',  'underline'));
  const [typedStyle,    setTypedStyleRaw]    = useState(() => load('kp-typed',   'background'));
  const [timerDisplay,  setTimerDisplayRaw]  = useState(() => load('kp-timer',   'bar'));

  const setCursorStyle  = (v) => { localStorage.setItem('kp-cursor', JSON.stringify(v));  setCursorStyleRaw(v);  };
  const setTypedStyle   = (v) => { localStorage.setItem('kp-typed',  JSON.stringify(v));  setTypedStyleRaw(v);   };
  const setTimerDisplay = (v) => { localStorage.setItem('kp-timer',  JSON.stringify(v));  setTimerDisplayRaw(v); };

  return (
    <SettingsContext.Provider value={{
      cursorStyle, setCursorStyle,
      typedStyle,  setTypedStyle,
      timerDisplay, setTimerDisplay,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = { children: PropTypes.node.isRequired };

export const useSettings = () => useContext(SettingsContext);
