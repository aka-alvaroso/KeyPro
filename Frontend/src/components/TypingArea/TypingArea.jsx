import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useTypingGame } from '../../hooks/useTypingGame';
import { useSettings } from '../../context/SettingsContext';

const ACCENT = 'rgba(8,98,243,';
const T = { duration: 1.4, repeat: Infinity, ease: 'easeInOut' };

const CursorChar = ({ char, style }) => {
  if (style === 'underline') {
    return (
      <motion.span
        className="text-kp-accent"
        animate={{ boxShadow: [`inset 0 -3px 0 ${ACCENT}1)`, `inset 0 -3px 0 ${ACCENT}0.08)`, `inset 0 -3px 0 ${ACCENT}1)`] }}
        transition={T}
      >
        {char}
      </motion.span>
    );
  }

  if (style === 'line') {
    return (
      <motion.span
        className="text-kp-muted"
        animate={{ boxShadow: [`-3px 0 0 ${ACCENT}1)`, `-3px 0 0 ${ACCENT}0.08)`, `-3px 0 0 ${ACCENT}1)`] }}
        transition={T}
      >
        {char}
      </motion.span>
    );
  }

  // block
  return (
    <motion.span
      className="text-kp-text rounded-sm"
      animate={{ backgroundColor: [`${ACCENT}0.22)`, `${ACCENT}0.03)`, `${ACCENT}0.22)`] }}
      transition={T}
    >
      {char}
    </motion.span>
  );
};

CursorChar.propTypes = {
  char: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
};

const TypingArea = ({ settings, sound, timeRemaining, onStart, onFinish, setAreResultsSaved }) => {
  const { cursorStyle } = useSettings();
  const { text, cursor, charResults } = useTypingGame({
    settings, sound, timeRemaining, onStart, onFinish, setAreResultsSaved,
  });

  return text.split('').map((char, index) => {
    if (index === cursor) {
      return <CursorChar key={index} char={char} style={cursorStyle} />;
    }

    if (charResults[index]) {
      return (
        <span key={index} className={charResults[index] === 'correct' ? 'text-kp-text/70' : 'text-red-500'}>
          {char}
        </span>
      );
    }

    return <span key={index} className="text-kp-muted">{char}</span>;
  });
};

TypingArea.propTypes = {
  settings: PropTypes.object.isRequired,
  sound: PropTypes.bool.isRequired,
  timeRemaining: PropTypes.number.isRequired,
  onStart: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  setAreResultsSaved: PropTypes.func.isRequired,
};

export default TypingArea;
