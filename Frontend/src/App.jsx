import './index.css'
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
// import Rankings from './pages/Rankings';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Profile from './pages/Profile';
// import About from './pages/About';
// import NotFound from './pages/NotFound';

function App () {


  const [sound, setSound] = useState(false)
  const [themeModalIsOpen, setThemeModalIsOpen] = useState(false);
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Home sound={sound} setSound={setSound} themeModalIsOpen={themeModalIsOpen} setThemeModalIsOpen={setThemeModalIsOpen} settingsModalIsOpen={settingsModalIsOpen} setSettingsModalIsOpen={setSettingsModalIsOpen} />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile/:username" element={<Profile sound={sound} setSound={setSound} themeModalIsOpen={themeModalIsOpen} setThemeModalIsOpen={setThemeModalIsOpen} settingsModalIsOpen={settingsModalIsOpen} setSettingsModalIsOpen={setSettingsModalIsOpen} />} />

      {/* <Route path="/rankings" component={<Rankings />} /> 
      <Route path="/about" component={About} />
      <Route component={NotFound} /> Para manejar rutas no encontradas */}
    </Routes>
  )
}

export default App
