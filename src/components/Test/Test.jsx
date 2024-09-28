import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const Test = ({ text, setTestResults }) => {
  const [testStarted, setTestStarted] = useState(false);

  const [cursor, setCursor] = useState(0)
  const [results, setResults] = useState([])
  const [currentInput, setCurrentInput] = useState('');
  const [cursorWordIndex, setCursorWordIndex] = useState(0);
  const [correctWords, setCorrectWordsCount] = useState(0);

  const [seconds, setSeconds] = useState(0)
  const [successes, setSuccesses] = useState(0)
  const [errors, setErrors] = useState(0)


  const words = text.split(' ')

  const checkWord = (inputWord) => {
    const isCorrect = inputWord === words[cursorWordIndex];
    if (isCorrect) {
      setCorrectWordsCount(prev => prev + 1);
    }
    setCursorWordIndex(prev => prev + 1);
  }

  useEffect(() => {
    let timer;

    if (testStarted) {
      // Iniciar el temporizador
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    // Limpiar el temporizador cuando el test termine
    return () => clearInterval(timer);
  }, [testStarted]);


  useEffect(() => {

    const handleKeyPress = (event) => {
      const currentChar = text[cursor];
      const typedChar = event.key;

      // Iniciar el temporizador cuando se pulse la primera letra
      if (!testStarted && /^[a-zA-Z0-9]$/.test(typedChar)) {
        setTestStarted(true);  // Marca que el test ha comenzado
      }

      if (event.key === ' ') {
        checkWord(currentInput);
        setCurrentInput(''); // Reiniciar para la siguiente palabra
      } else {
        setCurrentInput(prevInput => prevInput + event.key);
      }


      // Reiniciar
      if (typedChar === 'Escape') {
        setCursor(0)
        setResults([])
        setTestStarted(false)
        setCurrentInput('')
        setCursorWordIndex(0)
        setCorrectWordsCount(0)
        setSeconds(0)
        setSuccesses(0)
        setErrors(0)
        setTestResults({
          isReady: false,
          score: 0,
          velocity: 0,
          accurate: 0,
          errors: 0,
          totalChar: 0
        });

        return;
      }

      // Final del texto
      if (cursor === text.length - 1) {
        const finalSeconds = seconds === 0 ? 1 : seconds;
        const finalSuccesses = successes + errors === 0 ? 1 : successes + errors;

        setTestResults({
          isReady: true,
          score: parseInt((correctWords * successes) / finalSeconds),
          velocity: parseInt((correctWords / finalSeconds) * 60),
          accurate: ((successes / finalSuccesses) * 100).toFixed(2),
          errors: errors,
          totalChar: text.length
        });
        return
      }

      // Backspace
      if (typedChar === 'Backspace') {
        if (cursor > 0) {
          const newResults = results.slice(0, cursor - 1);
          setResults(newResults);
          setCursor(cursor - 1);
        }
        return;
      }

      // Ignorar teclas
      if (typedChar === 'CapsLock' || typedChar === 'Dead' || typedChar === 'Control' || typedChar === 'Backspace' || typedChar === 'Tab') {
        return
      }

      const isCorrect = typedChar === currentChar;

      isCorrect ? setSuccesses(successes + 1) : setErrors(errors + 1)

      setResults((prevResults) => {
        const newResults = [...prevResults];
        newResults[cursor] = isCorrect ? 'correct' : 'incorrect'; // Actualiza solo el carácter actual
        return newResults;
      });


      setCursor(cursor + 1);
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [cursor, text, successes, errors, seconds, correctWords, testStarted]);

  // Renderizar el texto
  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = '';

      // Aplicar la clase cursor al actual
      if (index === cursor) {
        className = 'text-orange-700 underline'
      } else if (results[index]) {
        // Asignar 'correct' o 'incorrect' según el resultado almacenado
        className = results[index] === 'correct' ? ' text-green-600 underline' : ' text-red-600  underline';
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );

    });
  }


  return (
    renderText()
  );
};

Test.propTypes = {
  text: PropTypes.string.isRequired,
  setTestResults: PropTypes.func.isRequired,
};

export default Test;
