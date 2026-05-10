import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';
import { useTypingGame } from '../../hooks/useTypingGame';

const TypingArea = ({ settings, sound, timeRemaining, onStart, onFinish, setAreResultsSaved }) => {
  const { theme } = useTheme();
  const { text, cursor, charResults } = useTypingGame({
    settings,
    sound,
    timeRemaining,
    onStart,
    onFinish,
    setAreResultsSaved,
  });

  return text.split('').map((char, index) => {
    let className = '';
    if (index === cursor) {
      className = `transition text-${theme}-primary underline actual`;
    } else if (charResults[index]) {
      className = charResults[index] === 'correct'
        ? 'transition text-green-600 underline'
        : 'transition text-red-600 underline';
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
