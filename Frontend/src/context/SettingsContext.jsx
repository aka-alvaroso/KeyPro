import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

export const SettingsProvider = ({ children }) => {
  const [cursorStyle, setCursorStyleRaw] = useState(() => load('kp-cursor', 'underline'));

  const setCursorStyle = (value) => {
    localStorage.setItem('kp-cursor', JSON.stringify(value));
    setCursorStyleRaw(value);
  };

  return (
    <SettingsContext.Provider value={{ cursorStyle, setCursorStyle }}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = { children: PropTypes.node.isRequired };

export const useSettings = () => useContext(SettingsContext);
