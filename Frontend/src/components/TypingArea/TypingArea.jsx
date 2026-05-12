import PropTypes from 'prop-types';
import { useTypingGame } from '../../hooks/useTypingGame';

const TypingArea = ({ settings, sound, timeRemaining, onStart, onFinish, setAreResultsSaved }) => {
  const { text, cursor, charResults } = useTypingGame({
    settings,
    sound,
    timeRemaining,
    onStart,
    onFinish,
    setAreResultsSaved,
  });

  return text.split('').map((char, index) => {
    let className = 'transition-colors duration-75';
    if (index === cursor) {
      className += ' text-kp-accent underline actual';
    } else if (charResults[index]) {
      className += charResults[index] === 'correct'
        ? ' text-kp-text/70 underline'
        : ' text-red-500 underline';
    } else {
      className += ' text-kp-muted';
    }
    return <span key={index} className={className}>{char}</span>;
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
