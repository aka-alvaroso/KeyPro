import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/Navbar/Navbar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useSettings } from '../context/SettingsContext';

const TABS = [
  { id: 'appearance', label: 'Apariencia' },
  { id: 'account',    label: 'Cuenta' },
];

const CURSORS = [
  {
    id: 'underline',
    label: 'Subrayado',
    preview: (
      <span className="text-kp-accent underline animate-pulse">A</span>
    ),
  },
  {
    id: 'line',
    label: 'Línea',
    preview: (
      <span className="relative inline-block">
        <span className="absolute -left-px top-0.5 bottom-0.5 w-0.5 bg-kp-accent rounded-full animate-pulse" />
        <span className="text-kp-muted">A</span>
      </span>
    ),
  },
  {
    id: 'block',
    label: 'Bloque',
    preview: (
      <span className="bg-kp-accent/25 text-kp-text rounded-sm animate-pulse px-0.5">A</span>
    ),
  },
];

const AppearanceTab = () => {
  const { cursorStyle, setCursorStyle } = useSettings();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-medium text-kp-muted mb-3 uppercase tracking-widest">Cursor</h3>
        <div className="flex gap-3">
          {CURSORS.map(({ id, label, preview }) => (
            <button
              key={id}
              onClick={() => setCursorStyle(id)}
              className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-150 cursor-pointer ${
                cursorStyle === id
                  ? 'border-kp-accent bg-kp-accent/5'
                  : 'border-kp-border bg-kp-surface hover:border-kp-accent/50'
              }`}
            >
              <span className="text-3xl font-medium w-12 h-10 flex items-center justify-center">
                {preview}
              </span>
              <span className={`text-xs font-medium ${cursorStyle === id ? 'text-kp-accent' : 'text-kp-muted'}`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const AccountTab = () => {
  const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
  const userData = JSON.parse(sessionStorage.getItem('userData') || 'null');

  const [imageURL, setImageURL] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  if (!isLoggedIn || !userData) {
    return (
      <p className="text-kp-muted text-sm">Debes iniciar sesión para ver las opciones de cuenta.</p>
    );
  }

  const handleSaveImage = async () => {
    if (!imageURL.trim()) return;
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/user/data`, {
        username: userData.username,
        imageURL,
      });
      if (response.status === 200) {
        setSaved(true);
        setError('');
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (e) {
      setError('No se pudo guardar la imagen.');
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-md">
      <div>
        <h3 className="text-sm font-medium text-kp-muted mb-3 uppercase tracking-widest">Imagen de perfil</h3>
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="URL de imagen"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <Button variant="filled" onClick={handleSaveImage}>
              <FontAwesomeIcon icon={faUpload} /> Guardar
            </Button>
            {saved && <span className="text-sm text-green-600">Guardado</span>}
            {error && <span className="text-sm text-red-500">{error}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

const Settings = ({ sound, setSound }) => {
  const [activeTab, setActiveTab] = useState('appearance');

  return (
    <div className="bg-kp-bg text-kp-text w-screen h-screen flex flex-col items-center">
      <Navbar sound={sound} setSound={setSound} />

      <main className="w-full max-w-3xl px-6 pt-8 flex gap-8">
        {/* Sidebar */}
        <nav className="flex flex-col gap-1 w-40 shrink-0">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`relative text-left px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                activeTab === id ? 'text-kp-accent font-medium' : 'text-kp-muted hover:text-kp-text'
              }`}
            >
              {activeTab === id && (
                <motion.span
                  layoutId="settings-tab-indicator"
                  className="absolute inset-0 bg-kp-accent/10 rounded-lg"
                />
              )}
              <span className="relative">{label}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-medium mb-6 text-kp-text">
            {TABS.find(t => t.id === activeTab)?.label}
          </h2>
          {activeTab === 'appearance' && <AppearanceTab />}
          {activeTab === 'account'    && <AccountTab />}
        </div>
      </main>
    </div>
  );
};

Settings.propTypes = {
  sound: PropTypes.bool.isRequired,
  setSound: PropTypes.func.isRequired,
};

export default Settings;
