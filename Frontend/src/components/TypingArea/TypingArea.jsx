import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useTypingGame } from '../../hooks/useTypingGame';
import { useSettings } from '../../context/SettingsContext';

const SPRING = { type: 'spring', stiffness: 340, damping: 28 };

const TypingArea = ({ settings, sound, timeRemaining, onStart, onFinish, setAreResultsSaved }) => {
  const { cursorStyle, typedStyle } = useSettings();
  const { text, cursor, charResults } = useTypingGame({
    settings, sound, timeRemaining, onStart, onFinish, setAreResultsSaved,
  });

  return text.split('').map((char, index) => {
    const isCursor = index === cursor;
    const result   = charResults[index];
    const delay    = Math.min(index * 0.006, 0.5);

    let className = '';

    if (isCursor) {
      className =
        cursorStyle === 'underline' ? 'text-kp-accent kp-cursor-underline'     :
        cursorStyle === 'line'      ? 'text-kp-muted kp-cursor-line'           :
                                     'text-kp-text rounded-sm kp-cursor-block' ;
    } else if (result) {
      const correct = result === 'correct';
      const textCls = correct ? 'text-kp-text/70' : 'text-red-500';
      const bgCls   =
        typedStyle === 'background' ? (correct ? 'bg-kp-accent/10 rounded-sm' : 'bg-red-500/10 rounded-sm') :
        typedStyle === 'underline'  ? 'underline' : '';
      className = `${textCls} ${bgCls}`;
    } else {
      className = 'text-kp-muted';
    }

    return (
      <motion.span
        key={`${text.slice(0, 6)}-${index}`}
        className={className}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay }}
      >
        {char}
      </motion.span>
    );
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
