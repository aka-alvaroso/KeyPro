import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import './Test.css'

const Test = ({ text }) => {
  const [cursor, setCursor] = useState(0)
  const [results, setResults] = useState([])

  useEffect(() => {

    const handleKeyPress = (event) => {
      const currentChar = text[cursor];
      const typedChar = event.key;

      console.log(typedChar);
      if (typedChar === 'Tab') {
        setResults([])
        setCursor(0)
        return
      }

      if (typedChar === 'CapsLock' || typedChar === 'Dead' || typedChar === 'Control' || typedChar === 'Backspace') {
        return
      }

      const isCorrect = typedChar === currentChar;

      setResults((prevResults) => [
        ...prevResults,
        isCorrect ? 'correct' : 'incorrect',
      ]);


      setCursor(cursor + 1);
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [cursor, text]);

  // Renderizar el texto
  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = '';

      // Aplicar la clase cursor al actual
      if (index === cursor) {
        className = 'text-orange-700 relative before:absolute before:bottom-0 before:left-0 before:w-10/12 before:h-0.5 before:bg-orange-700'
      } else if (results[index]) {
        // Asignar 'correct' o 'incorrect' según el resultado almacenado
        className = results[index] === 'correct' ? 'relative text-green-600 before:absolute before:bottom-0 before:left-0 before:w-10/12 before:h-0.5 before:bg-green-600' : 'relative text-red-600 before:absolute before:bottom-0 before:left-0 before:w-10/12 before:h-0.5 before:bg-red-600';
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );

    });
  }


  return (
    <div className='max-w-4/6 w-4/6 my-8 text-stone-600 text-3xl'>
      {renderText()}
    </div>
  );
};

Test.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Test;
