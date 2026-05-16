import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, Clock, Globe, Code2, ChevronDown, BarChart2, AlignLeft } from 'lucide-react';

// ── Chip ─────────────────────────────────────────────────────────────────────
const Chip = ({ icon, children, onClick, arrow = false }) => (
  <button
    onClick={onClick}
    onMouseDown={e => e.preventDefault()}
    className="flex items-center gap-1.5 bg-kp-surface border border-kp-border px-3 py-1.5 text-sm text-kp-muted hover:border-kp-accent hover:text-kp-accent transition-all duration-150 cursor-pointer select-none"
  >
    <span className="text-kp-accent">{icon}</span>
    <span>{children}</span>
    {arrow && <ChevronDown size={12} className="text-kp-muted ml-0.5" />}
  </button>
);

// ── Popover ───────────────────────────────────────────────────────────────────
const TEXT_LANGS = [['es', 'Español'], ['en', 'English']];
const CODE_LANGS = [['python', 'Python'], ['javascript', 'JavaScript'], ['c++', 'C++'], ['html', 'HTML'], ['java', 'Java']];

const TypePopover = ({ type, lang, onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: -6, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -6, scale: 0.97 }}
    transition={{ duration: 0.15, ease: 'easeOut' }}
    className="absolute top-full left-0 mt-2 bg-kp-bg border border-kp-border shadow-lg p-3 z-50 min-w-44"
  >
    <p className="text-xs text-kp-muted uppercase tracking-wider mb-1.5">Texto</p>
    {TEXT_LANGS.map(([l, label]) => (
      <PopoverItem key={l} active={type === 'text' && lang === l} onClick={() => onSelect('text', l)}>
        {label}
      </PopoverItem>
    ))}

    <div className="border-t border-kp-border my-2" />

    <p className="text-xs text-kp-muted uppercase tracking-wider mb-1.5">Código</p>
    {CODE_LANGS.map(([l, label]) => (
      <PopoverItem key={l} active={type === 'code' && lang === l} onClick={() => onSelect('code', l)}>
        {label}
      </PopoverItem>
    ))}
  </motion.div>
);

const PopoverItem = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    onMouseDown={e => e.preventDefault()}
    className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors duration-100 ${
      active ? 'text-kp-accent bg-kp-accent/8 font-medium' : 'text-kp-text hover:bg-kp-surface'
    }`}
  >
    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${active ? 'bg-kp-accent' : 'bg-transparent'}`} />
    {children}
  </button>
);

// ── GameSelector ──────────────────────────────────────────────────────────────
const MODES        = ['practice', 'timed'];
const DIFFICULTIES = ['easy', 'medium', 'hard'];
const LENGTHS      = ['short', 'medium', 'long'];
const TIMES        = [30, 60, 120];

const MODE_LABEL = { practice: 'Práctica', timed: 'Cronómetro' };
const DIFF_LABEL = { easy: 'Fácil', medium: 'Medio', hard: 'Difícil' };
const LEN_LABEL  = { short: 'Corto', medium: 'Medio', long: 'Largo' };
const TEXT_LABEL = { es: 'Español', en: 'English' };
const CODE_LABEL = { python: 'Python', javascript: 'JavaScript', 'c++': 'C++', html: 'HTML', java: 'Java' };

function cycle(arr, current) {
  return arr[(arr.indexOf(current) + 1) % arr.length];
}

const GameSelector = ({ setGameSettings }) => {
  const [mode,       setMode]       = useState('practice');
  const [type,       setType]       = useState('text');
  const [lang,       setLang]       = useState('es');
  const [difficulty, setDifficulty] = useState('easy');
  const [length,     setLength]     = useState('medium');
  const [time,       setTime]       = useState(60);
  const [popover,    setPopover]    = useState(false);

  const popoverRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) setPopover(false);
    };
    const closeOnKey = () => setPopover(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', closeOnKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', closeOnKey);
    };
  }, []);

  const cycleMode = () => {
    const next = cycle(MODES, mode);
    setMode(next);
    setGameSettings(p => ({ ...p, mode: next }));
  };

  const cycleDiff = () => {
    const next = cycle(DIFFICULTIES, difficulty);
    setDifficulty(next);
    setGameSettings(p => ({ ...p, difficulty: next }));
  };

  const cycleLength = () => {
    const next = cycle(LENGTHS, length);
    setLength(next);
    setGameSettings(p => ({ ...p, length: next }));
  };

  const cycleTime = () => {
    const next = cycle(TIMES, time);
    setTime(next);
    setGameSettings(p => ({ ...p, time: next }));
  };

  const selectTypeLang = (t, l) => {
    setType(t);
    setLang(l);
    setPopover(false);
    setGameSettings(p => ({ ...p, type: t, language: l }));
  };

  const typeLangLabel = type === 'text' ? TEXT_LABEL[lang] : CODE_LABEL[lang];

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center">
      <Chip icon={<Keyboard size={14} />} onClick={cycleMode}>
        {MODE_LABEL[mode]}
      </Chip>

      {mode === 'timed' && (
        <Chip icon={<Clock size={14} />} onClick={cycleTime}>
          {time}s
        </Chip>
      )}

      <div className="relative" ref={popoverRef}>
        <Chip
          icon={type === 'text' ? <Globe size={14} /> : <Code2 size={14} />}
          arrow
          onClick={() => setPopover(v => !v)}
        >
          {typeLangLabel}
        </Chip>
        <AnimatePresence>
          {popover && (
            <TypePopover type={type} lang={lang} onSelect={selectTypeLang} />
          )}
        </AnimatePresence>
      </div>

      <Chip icon={<BarChart2 size={14} />} onClick={cycleDiff}>
        {DIFF_LABEL[difficulty]}
      </Chip>

      <Chip icon={<AlignLeft size={14} />} onClick={cycleLength}>
        {LEN_LABEL[length]}
      </Chip>
    </div>
  );
};

GameSelector.propTypes = {
  gameSettings: PropTypes.object,
  setGameSettings: PropTypes.func,
};

PopoverItem.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

TypePopover.propTypes = {
  type: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

Chip.propTypes = {
  icon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  arrow: PropTypes.bool,
};

export default GameSelector;
