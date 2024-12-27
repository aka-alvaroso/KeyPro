import PropTypes from 'prop-types';
import axios from '../../axiosConfig';
import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Test = ({ testStarted, setTestStarted, sound, settings, setTestResults, timeRemaining }) => {
  const { theme } = useTheme();

  const [text, setText] = useState('');
  const [cursor, setCursor] = useState(0)
  const [results, setResults] = useState([])

  const [seconds, setSeconds] = useState(0)
  const [successes, setSuccesses] = useState(0)
  const [errors, setErrors] = useState(0)



  useEffect(() => {
    fetchText();
  }, [settings]);

  const fetchText = async () => {
    const response = await axios.get('http://localhost:3000/text/get', {
      params: {
        type: settings.type,
        numWords: settings.numWords,
        difficulty: settings.difficulty,
        language: settings.language,
      },
    });

    if (response.data && response.data.length > 0) {
      const randomIndex = Math.floor(Math.random() * response.data.length);
      const randomText = response.data[randomIndex];

      setText(randomText.content);
    }
  };

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

      if (!testStarted && /^[a-zA-Z0-9]$/.test(typedChar)) {
        setTestStarted(true);
      }


      // Reiniciar
      if (typedChar === 'Escape') {
        setCursor(0)
        setResults([])
        setTestStarted(false)
        setSeconds(0)
        setSuccesses(0)
        setErrors(0)
        setTestResults({
          isReady: false,
          score: 0,
          ppm: 0,
          cpm: 0,
          accurate: 0,
          errors: 0,
          totalChar: 0,
          time: 0
        });

        fetchText();
        return;
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
      if (typedChar === 'CapsLock'
        || typedChar === 'Dead'
        || typedChar === 'Control'
        || typedChar === 'Backspace'
        || typedChar === 'Tab'
        || typedChar === 'Alt'
        || typedChar === 'AltGraph'
        || typedChar === 'Shift'
        || typedChar === 'AudioVolumeDown'
        || typedChar === 'AudioVolumeUp'
        || typedChar === 'AudioVolumeMute'
      ) {
        return;
      }

      if (settings.mode === 'timed' && timeRemaining <= 0) {
        setTestStarted(false);

        const minutes = seconds / 60;
        const cpm = Math.round((successes + errors) / minutes);
        const ppm = cpm / 5;
        const accurate = Math.round((successes / (successes + errors)) * 100);
        const time = Math.round(seconds);
        const score = Math.round(Math.max(0, 100 * (0.2 * ppm / 100 + 0.6 * accurate / 100 - 0.2 * errors / (successes + errors))));

        setTestResults({
          isReady: true,
          score: score,
          ppm: ppm,
          cpm: cpm,
          accurate: accurate,
          errors: errors,
          totalChar: successes + errors,
          time: time
        });

        if (sessionStorage.getItem('loggedIn') === 'true') {
          axios.post('http://localhost:3000/user/update', {
            email: JSON.parse(sessionStorage.getItem('userData')).email,
            stats: {
              score: score,
              cpm: cpm,
              ppm: ppm,
              accurate: accurate,
              errors: errors,
              totalChar: successes + errors,
              time: time
            },
            test: {
              type: settings.type,
              numWords: settings.numWords,
              difficulty: settings.difficulty,
            }
          }).then((response) => {
            console.log('Estadísticas actualizadas:', response.data);
          }).catch((error) => {
            console.error('Error al actualizar las estadísticas:', error);
          });
        }

        return;
      }

      if (cursor === text.length - 1) {

        if (settings.mode === 'timed' && timeRemaining > 0) {
          setCursor(0)
          setResults([])
          fetchText();
          return;
        }

        setTestStarted(false);

        if (successes + errors === 0 || seconds === 0) {
          console.log('No hay errores ni correctos');
          setTestResults({
            isReady: true,
            score: 0,
            ppm: 0,
            cpm: 0,
            accurate: 0,
            errors: 0,
            totalChar: 0,
            time: 0
          });
          return;
        }

        const minutes = seconds / 60;
        const cpm = Math.round((successes + errors) / minutes);
        const ppm = cpm / 5;
        const accurate = Math.round((successes / (successes + errors)) * 100);
        const time = Math.round(seconds);
        const score = Math.round(Math.max(0, 100 * (0.2 * ppm / 100 + 0.6 * accurate / 100 - 0.2 * errors / (successes + errors))));

        setTestResults({
          isReady: true,
          score: score,
          ppm: ppm,
          cpm: cpm,
          accurate: accurate,
          errors: errors,
          totalChar: successes + errors,
          time: time
        });

        if (sessionStorage.getItem('loggedIn') === 'true') {
          axios.post('http://localhost:3000/user/update', {
            email: JSON.parse(sessionStorage.getItem('userData')).email,
            stats: {
              score: score,
              cpm: cpm,
              ppm: ppm,
              accurate: accurate,
              errors: errors,
              totalChar: successes + errors,
              time: time
            },
            test: {
              type: settings.type,
              numWords: settings.numWords,
              difficulty: settings.difficulty,
            }
          }).then((response) => {
            console.log('Estadísticas actualizadas:', response.data);
          }).catch((error) => {
            console.error('Error al actualizar las estadísticas:', error);
          });
        }

        return;
      }

      if (sound) {
        const audio = new Audio('/keysound.mp3');
        audio.currentTime = 0;
        audio.play();
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

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [cursor, text, successes, errors, seconds, testStarted]);


  // Renderizar el texto
  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = '';

      // Aplicar la clase cursor al actual
      if (index === cursor) {
        className = `transition text-${theme}-primary underline actual`;
      } else if (results[index]) {
        // Asignar 'correct' o 'incorrect' según el resultado almacenado
        className = results[index] === 'correct' ? 'transition text-green-600 underline ' : 'transition text-red-600  underline';
      }
      return (
        <span key={index} className={`${className}`}>
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
  settings: PropTypes.object.isRequired,
  setTestResults: PropTypes.func.isRequired,
};

export default Test;
